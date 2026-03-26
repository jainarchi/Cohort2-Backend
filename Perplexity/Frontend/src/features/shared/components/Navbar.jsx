import {RiMenuLine} from '@remixicon/react'
import { useSelector } from 'react-redux'

const Navbar = ({isSidebarOpen , setIsSidebarOpen}) => {

  const chats = useSelector(state => state.chat.chats)
  const chatId = useSelector(state => state.chat.currentChatId)




  return (
    <nav className='navbar'>

       <div className='nav-left'>

        <span className={`${isSidebarOpen && 'hide'}`}>
          
            <RiMenuLine size={"1.5rem"} className="nav-hamburger" 
             onClick={()=> setIsSidebarOpen(true)} />

        </span>
       
     
            <h3>Infra AI</h3>

        </div>

        <p className='nav-title'>{chats[chatId]?.title}</p>
      
    </nav>
  )
}

export default Navbar
