import React, { useEffect, useState , useRef } from "react";
import {RiUser3Line , RiLogoutCircleRLine} from '@remixicon/react'
import "../style/sidebar.scss";
import { Link } from "react-router-dom";
import {
  RiMenuLine,
  RiEditBoxLine,
  RiFlashlightLine,
  RiMore2Line,
  RiPencilLine,
  RiDeleteBin7Line,
} from "@remixicon/react";

import { useSelector } from "react-redux";
import { useChat } from "../../../features/chat/hook/useChat.js";

const Sidebar = () => {
  const [showOptions, setShowOptions] = useState(null);
  const [title, setTitle] = useState('');
  const [titleChatId, setTitleChatId] = useState(null);
  const sidebarRef = useRef()
  const sidebarSmallRef = useRef()
  const user = useSelector((state) => state.auth.user);
  

  const {
    handleGetChats,
    handleOpenChat,
    handleDeleteChat,
    handleEditTitle,
    handleNewChat,
  } = useChat();
  const chats = useSelector((state) => state.chat.chats);

  useEffect(() => {
    handleGetChats();
  }, []);

  // CLICK OUTSIDE DROPDOWN HANDLER
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".dot-icon")) {
        setShowOptions(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const renameTitle = async (chatId, newTitle) => {
    await handleEditTitle(chatId, newTitle);
  };

  const deleteChat = async (chatId) => {
    try {
      await handleDeleteChat(chatId);
    } catch (err) {
      console.log("err occur ", err);
    }
  };

  const openChat = (chatId) => {
    handleOpenChat(chatId, chats);
  }


  function toggleSidbar () {
   sidebarRef.current.classList.toggle("sidebar-toggle")
   sidebarRef.current.classList.toggle("sidebar")

   
   if(sidebarSmallRef.current){
    sidebarSmallRef.current.classList.toggle("static")
   }

  }


  function handleLogout (){
    // logout
  }


  if (!chats) {
    return <div>loading...</div>;
  }

  return (

    <>

    <div className="sidebar" ref={sidebarRef}>
      <div>
        <div className="options">
          <div className="menu-div">
            <RiMenuLine size={"1.2rem"} className="hamburger" onClick={toggleSidbar} />
           
          </div>

          <Link className="flex" onClick={handleNewChat}>
            <RiEditBoxLine size={"1.1rem"} className="icon" />
            New chat
          </Link>

          <Link className="flex">
            <RiFlashlightLine size={"1.1rem"} className="icon" />
            Explore
          </Link>
        </div>

        <div className="allChats">
          <h5>Chats</h5>

          {Object.values(chats).map((chat, index) => (
            <div
              className="flex chat-title"
              onClick={() => openChat(chat.id)}
              key={index}
            >
              <span className="title">
                {titleChatId === chat.id ? (
                  <input
                    className="editTitleInput"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    autoFocus
                    onClick={(e) => e.stopPropagation()}
                    onBlur={() => {
                      if(chat.title !== title){
                        renameTitle(chat.id, title);
                      }
                      setTitleChatId(null);
                      setTitle('');
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        if(chat.title !== title){
                          renameTitle(chat.id, title);
                        }
                        setTitleChatId(null);
                        setTitle('');
                      }
                    }}
                  />
                ) : (
                  chat.title
                )}
              </span>

             
              <div className="dot-icon"> 
                <RiMore2Line
                  size={"1rem"}
                  className="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowOptions(showOptions === chat.id ? null : chat.id);
                  }}
                />

                <div
                  className={`chat-option ${showOptions === chat.id ? "show" : ""}`}
                  onClick={(e) => e.stopPropagation()} 
                >
                  <div
                    onClick={(e) => {
                      e.stopPropagation(); 
                      setTitleChatId(chat.id);
                      setTitle(chat.title);
                    }}
                  >
                    <RiPencilLine size={"18px"} /> rename
                  </div>

                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteChat(chat.id);
                    }}
                  >
                    <RiDeleteBin7Line size={"18px"} /> delete
                  </div>
                </div>
              </div>

            </div>
          ))}

        </div>
      </div>

      <div className="sidebar-footer">

      <div className="profileInfo">
        <div className="profile-icon ">
         <RiUser3Line size={'18px'} />
        </div>
        
        {user.username}
        </div>


        <div className="profileInfo" onClick={handleLogout}>
          <div className="logout-icon" >
            <RiLogoutCircleRLine size={'18px'}/>
          </div>
          logout
        </div>

        </div>
    </div>



{/* desktop sidebar close view */}


  <div className="desptop-sidebar-close-view " ref={sidebarSmallRef}>
     
        <div className="options">

          <div className="menu-div">
            <RiMenuLine size={"1.2rem"} className="hamburger" onClick={toggleSidbar} />
          </div>

          <Link className="flex" onClick={handleNewChat}>
            <RiEditBoxLine size={"1.1rem"} className="icon" />
          </Link>

          <Link className="flex">
            <RiFlashlightLine size={"1.2rem"} className="icon" />
          </Link>
        </div>




      <div className="sidebar-footer ">

     
         <div className="profile-icon ">
         <RiUser3Line size={'1.1rem'} />
         </div>
        
          <div className="logout-icon" 
               onClick={handleLogout} >
            <RiLogoutCircleRLine size={'1.1rem'}/>
          </div>
         
      

        </div>
    </div>




  </>

  );
};

export default Sidebar;