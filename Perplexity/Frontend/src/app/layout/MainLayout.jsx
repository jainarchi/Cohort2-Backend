import React from 'react'
import Navbar from '../../features/shared/components/Navbar.jsx'
import Sidebar from '../../features/shared/components/Sidebar.jsx'
import Dashboard from '../../features/chat/pages/Dashboard.jsx'
import '../style/MainLayout.scss'


const MainLayout = () => {
  return (
    <div className='mainLayout'>
     <Sidebar />


   <div className='right'>
    <Navbar />



    <div className="mainContent">

       <Dashboard />

    </div>
    
    
    
     </div>      
    </div>
  )
}

export default MainLayout
