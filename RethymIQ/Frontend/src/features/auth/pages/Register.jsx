import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import InputField from '../components/InputField'
import { useAuth } from '../hooks/useAuth'
import '../style/form.scss'





const Register = () => {
  const navigate = useNavigate()
  const { handleRegister, loading } = useAuth()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  
  })

  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.username.trim()) {
      newErrors.username = 'Full name is required'
    } else if (formData.username.trim().length < 2) {
      newErrors.username = 'Full name must be at least 2 characters'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }




  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      await handleRegister({
        username: formData.username,
        email: formData.email,
        password: formData.password
      })
      navigate('/')
    } catch (error) {
      setErrors({
        submit: error.message || 'Registration failed. Please try again.'
      })
    }
  }




  const UserIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )

  const MailIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )

  const LockIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )

  return (
    <div className="auth-page auth-register">

        <div className="auth-card">
          <div className="auth-form-header">
            <h2 className="auth-title">Create Account</h2>
            <p className="auth-description">Join Moodify and start tracking your mood journey today.</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <InputField
              label="Full Name"
              name="username"
              type="text"
              placeholder="John Doe"
              value={formData.username}
              onChange={handleChange}
              icon={UserIcon}
              error={errors.username}
              required
            />

            <InputField
              label="Email Address"
              name="email"
              type="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              icon={MailIcon}
              error={errors.email}
              required
            />

            <InputField
              label="Password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              icon={LockIcon}
              error={errors.password}
              togglePassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
              required
            />

          
            <button
              type="submit"
              className="auth-button"
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>

          <div className="auth-footer">
            <p className="auth-footer-text">
              Already have an account? <Link to="/login" className="auth-link">Log In</Link>
            </p>
          </div>
        </div>
    </div>
  )
}

export default Register
