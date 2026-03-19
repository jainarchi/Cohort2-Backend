import React, { useState } from 'react'
import { useNavigate, Link, Navigate } from 'react-router-dom'
import FormInput from '../components/formInput'
import '../style/auth.scss'
import { useAuth } from '../hook/useAuth'
import { useSelector } from 'react-redux'

const Login = () => {
  const navigate = useNavigate()
  const {handleLogin} = useAuth()
  const {user, loading} = useSelector(state => state.auth)


  
  const [formData, setFormData] = useState({
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

    const payload = {
      email : formData.email ,
      password : formData.password
    }

    await handleLogin(payload)
    navigate('/')

    // handle err and access
  }


  if(!loading && user){
    return <Navigate to='/' replace />
  }


  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-card">
          <div className="auth-header">
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">


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
              {/* {loading ? 'Signing in...' : 'Sign In'} */}
              sign in
            </button>
          </form>

          <div className="auth-footer">
            <p className="auth-footer-text">
              Don't have an account?{' '}
              <Link to="/register" className="auth-link">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
