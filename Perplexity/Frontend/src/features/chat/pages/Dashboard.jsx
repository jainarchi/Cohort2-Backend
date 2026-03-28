import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useChat } from "../hook/useChat";
import "../style/dashboard.scss";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import InputBar from "../components/InputBar";

const Dashboard = () => {
  const chat = useChat();

  const chats = useSelector((state) => state.chat.chats);
  const currentChatId = useSelector((state) => state.chat.currentChatId);
  const lastMessageRef = useRef(null);

  useEffect(() => {
    chat.initializationSocketConnection();
  }, []);




  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.focus();
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chats[currentChatId]?.messages]);




  return (
    <>
    <div className="dashboard">


      <div className="messages">
        {/* {console.log(chats[currentChatId])} */}

        {currentChatId === null ? (
          <>
            <h1 className="mainHeading">What can I help you today ?</h1>
          </>
        ) :  
        (
          chats[currentChatId]?.messages.map((message, index, arr) => {
            const isLast = index === arr.length - 1;

            return (
              <div
                key={message.id || index}
                ref={isLast ? lastMessageRef : null}
                tabIndex={-1}
                className={`message ${message.role === "user" ? "user" : "assistant"}`}
              >
                {message.role === "user" ? (
                  <p className="text">{message.content}</p>
                ) : (
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => (
                        <p className="md-paragraph">{children}</p>
                      ),
                      ul: ({ children }) => (
                        <ul className="md-list">{children}</ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="md-olist">{children}</ol>
                      ),
                      code: ({ children }) => (
                        <code className="md-code">{children}</code>
                      ),
                      pre: ({ children }) => (
                        <pre className="md-pre">{children}</pre>
                      ),
                    }}
                    remarkPlugins={[remarkGfm]}
                  >
                    {message.content}
                  </ReactMarkdown>
                )}
              </div>
            )
          })
        )}

      </div>


     
     
    </div>

     <InputBar />


    </>
  );
};

export default Dashboard;
