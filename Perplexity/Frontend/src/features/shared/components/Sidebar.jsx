import React, { useEffect, useState, useRef } from "react";
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
  const menuRef = useRef(null)
  const [showOptions, setShowOptions] = useState(null);

  const [title, setTitle] = useState('');
  const [titleChatId, setTitleChatId] = useState(null);

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
  }, [])


   useEffect(() => {
    // if dropdown open and click outside
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowOptions(null)
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const renameTitle = async (chatId, newTitle) => {
   await handleEditTitle(chatId , newTitle)
  };

  const deleteChat = async (chatId) => {
    console.log(chatId);

    try {
      await handleDeleteChat(chatId);
    } catch (err) {
      console.log("err occur ", err);
    }
  };

  const openChat = (chatId) => {
    handleOpenChat(chatId, chats);
  };

  if (!chats) {
    return <div>loading...</div>;
  }

  return (
    <div className="sidebar">
      <div>
        <div className="options">
          <div className="menu-div">
            <RiMenuLine size={"1.2rem"} className="hamburger" />
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
                <>
                {console.log(titleChatId)}
              
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  autoFocus
                  onClick={(e) => e.stopPropagation()}
                  onBlur={() => {
                    renameTitle(chat.id, title)
                    setTitleChatId(null)
                    setTitle('')
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      renameTitle(chat.id, title)
                      setTitleChatId(null)
                      setTitle('')
                    }
                  }}
                />

                </>
              ) :
              chat.title  
            }
            </span>

              <div ref={menuRef} className="dot-icon">
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
                >
                  <div
                    onClick={(e) => {
                      e.stopPropagation()
                      setTitleChatId(chat.id)
                      setTitle(chat.title)
                    }}
                  >
                    <RiPencilLine size={"18px"} /> rename
                  </div>

                  <div onClick={() => deleteChat(chat.id)}>
                    <RiDeleteBin7Line size={"18px"} /> delete
                  </div>
                </div>
              </div>




            </div>
          ))}
















        </div>
      </div>

      <div className="profileInfo">username</div>
    </div>
  );
};

export default Sidebar;
