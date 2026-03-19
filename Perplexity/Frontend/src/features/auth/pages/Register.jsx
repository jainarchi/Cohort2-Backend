import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import FormInput from '../components/formInput'
import '../style/auth.scss'

const Register = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })


  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))  
  }


  const handleSubmit = async (e) => {
    e.preventDefault()


  
  }




  

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-card">
          <div className="auth-header">
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle">Join us today</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">


            <FormInput
              label="Username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
              required
              // error={errors.username}
            />

            <FormInput
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              // error={errors.email}
            />

            <FormInput
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              // error={errors.password}
            />

            <button 
              type="submit" 
              className="btn btn-primary"
              // disabled={loading}
            >
              {/* {loading ? 'Creating account...' : 'Create Account'} */}
              create
            </button>
          </form>

          <div className="auth-footer">
            <p className="auth-footer-text">
              Already have an account?{' '}
              <Link to="/login" className="auth-link">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
