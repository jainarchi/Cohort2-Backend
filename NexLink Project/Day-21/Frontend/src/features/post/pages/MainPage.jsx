import SidebarDesktop from '../components/SidebarDesktop'
import '../style/SidebarDesktop.scss'
import '../style/mainPage.scss'
import { Outlet } from 'react-router-dom'






const MainPage = () => {
  return (
    <div className='mainPage'>

    <div  className='sidebarCont'>
        <SidebarDesktop />
     </div>

     <div className='showContent'>

         <Outlet />  
      
     </div>
      
    </div>
  )
}

export default MainPage
