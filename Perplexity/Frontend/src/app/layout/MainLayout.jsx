import {useState} from 'react'
import Navbar from '../../features/shared/components/Navbar.jsx'
import Sidebar from '../../features/shared/components/Sidebar.jsx'
import Dashboard from '../../features/chat/pages/Dashboard.jsx'
import '../style/MainLayout.scss'


const MainLayout = () => {
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);




  return (
    <div className='mainLayout'>
     <Sidebar isSidebarOpen
     ={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}  />


   <div className='right'>
    <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}  />

    <div className="mainContent">

       <Dashboard />

    </div>
    
    
    
     </div>      
    </div>
  )
}

export default MainLayout
