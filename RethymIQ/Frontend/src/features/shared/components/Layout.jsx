import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import '../styles/layout.scss'

/**
 * Layout Component - 4 Layer Architecture
 * Layer: Components (Shared)
 * Purpose: Main layout wrapper for all routes
 */
const Layout = () => (
  <div className="app-container">
    <main className="main-content">
      <Navbar />
      <div className='outlet'>
          <Outlet />
      </div>
      
    </main>
    <Sidebar />
  </div>
)

export default Layout
