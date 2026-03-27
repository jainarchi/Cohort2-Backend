import {useState} from 'react'
import Navbar from '../../features/shared/components/Navbar.jsx'
import Sidebar from '../../features/shared/components/Sidebar.jsx'
import '../style/MainLayout.scss'
import { Outlet } from 'react-router-dom'


const MainLayout = () => {
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);




  return (
    <div className='mainLayout'>
     <Sidebar isSidebarOpen
     ={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}  />


   <div className='right'>
    <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}  />

    <div className="mainContent">

      <Outlet />

    </div>
    
    
    
     </div>      
    </div>
  )
}

export default MainLayout
