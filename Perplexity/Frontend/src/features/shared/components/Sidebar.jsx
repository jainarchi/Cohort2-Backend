import React, { useEffect , useState } from "react";
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
  const [activeChat, setActiveChat] = useState(null)
  const { handleGetChats, handleOpenChat , handleDeleteChat , handleEditTitle } = useChat();
  const chats = useSelector((state) => state.chat.chats);

  useEffect(() => {
    handleGetChats();
  }, []);


//    const editTitle = (chatId , newTitle) =>{
//     console.log(chatId , newTitle)

//    }

   const deleteChat = async (chatId) =>{
    console.log(chatId)

    try{
    await handleDeleteChat(chatId)
   }catch(err){
    console.log('err occur ' , err)
   }
   }



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

          <Link className="flex">
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
            <button
              className="flex chat-title"
              onClick={() => openChat(chat.id)}
              key={index}
            >
              <span className="title">{chat.title}</span>

              <div>
                <RiMore2Line
                  size={"1rem"}
                  className="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveChat(activeChat === chat.id ? null : chat.id);
                  }}
                />

                <div
                  className={`chat-option ${activeChat === chat.id ? "show" : ""}`}
                >
                  <div>
                    <RiPencilLine size={"18px"} /> edit
                  </div>
                  <div onClick={() =>deleteChat(chat.id)}>
                    <RiDeleteBin7Line size={"18px"} /> delete
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="profileInfo">username</div>
    </div>
  );
};

export default Sidebar;
