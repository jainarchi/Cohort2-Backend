import React from 'react'
import '../style/sidebar.scss'
import { Link } from 'react-router-dom'
import { RiMenuLine , RiEditBoxLine ,RiFlashlightLine, RiMore2Line} from "@remixicon/react";

const sidebar = () => {
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
                <ul>
                    <li className='flex chat-title'>wha is llm  <RiMore2Line size={'1rem'} className='icon'/></li>
                    <li>explain</li>
                    <li>err handling</li>
                    <li>something Lorem ipsum dolor

                    </li>
                </ul>

            </div>


        </div>


        <div className='profileInfo'>
            username
        </div>
      
    </div>
  )
}

export default sidebar
