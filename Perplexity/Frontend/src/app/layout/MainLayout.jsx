import React from 'react'
import Navbar from '../../features/shared/components/Navbar.jsx'
import Sidebar from '../../features/shared/components/Sidebar.jsx'
import Dashboard from '../../features/chat/pages/Dashboard.jsx'



const MainLayout = () => {
  return (
    <div MainLayout>
   <Sidebar />


   <div className='right'>

    <Navbar />

    <div className="maincontent">

       <Dashboard />

    </div>
    
    
    
    </div>      
    </div>
  )
}

export default MainLayout
