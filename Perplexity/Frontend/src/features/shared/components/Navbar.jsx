import React from 'react'
import { useSelector } from 'react-redux'

const Navbar = () => {

  const chats = useSelector(state => state.chat.chats)
  const chatId = useSelector(state => state.chat.currentChatId)




  return (
    <nav className='navbar'>
     
        <h3>Infra AI</h3>

        <p>{chats[chatId]?.title}</p>
      
    </nav>
  )
}

export default Navbar
