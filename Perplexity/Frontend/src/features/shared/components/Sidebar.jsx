import React , {useEffect} from 'react'
import '../style/sidebar.scss'
import { Link } from 'react-router-dom'
import { RiMenuLine , RiEditBoxLine ,RiFlashlightLine, RiMore2Line} from "@remixicon/react";
import { useSelector} from 'react-redux';
import {useChat} from '../../../features/chat/hook/useChat.js'




const Sidebar = () => {
   const {handleGetChats , handleOpenChat} = useChat()
   const chats = useSelector(state => state.chat.chats)

   useEffect(() => {
      handleGetChats()
    
   }, [])



   const openChat = (chatId) =>{
    handleOpenChat(chatId , chats)
   }




   if( !chats){
    return (
        <div>
            loading...
        </div>
    )
   }




  return (
    <div className='sidebar'>

        <div>
            <div className='options'>
                <div className='menu-div'>
                    < RiMenuLine  size={'1.2rem'} className='hamburger' />
                </div>
                
              <Link className='flex'><RiEditBoxLine size={'1.1rem'} className='icon'/>New chat</Link>

              <Link className='flex'><RiFlashlightLine size={'1.1rem'}  className='icon'/>Explore</Link>
           
            </div>

            <div className="allChats">
                <h5>Chats</h5>
                
                
                   {Object.values(chats).map((chat , index) => (

                    <button 
                      className='flex chat-title'
                      onClick={() => openChat(chat.id)}
                      key={index}
                    >
                        {chat.title}
                        
                    
                        <RiMore2Line size={'1rem'} className='icon'/>
                    </ button>

                   ))}
            </div>


        </div>


        <div className='profileInfo'>
            username
        </div>
      
    </div>
  )
}

export default Sidebar
