import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useChat } from "../hook/useChat";
import "../style/dashboard.scss";
import { RiArrowUpLine } from "@remixicon/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Dashboard = () => {
  const [chatInput, setchatInput] = useState("");
  const chat = useChat();

  const chats = useSelector((state) => state.chat.chats);
  const currentChatId = useSelector((state) => state.chat.currentChatId);
  const lastMessageRef = useRef(null);

  useEffect(() => {
    chat.initializationSocketConnection();
  }, []);

  const handleSubmitMessage = (e) => {
    e.preventDefault();

    const trimmedMessage = chatInput.trim();
    if (!trimmedMessage) {
      return;
    }

    chat.handleSendMessage({
      message: trimmedMessage,
      chatId: currentChatId,
    });

    setchatInput("");
  };

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.focus();
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chats[currentChatId]?.messages]);





  return (
    <div className="dashboard">


      <div className="messages">
        {console.log(chats[currentChatId])}



        {currentChatId === null ? (
          <>
            <h1 className="mainHeading">What is in your <br /> Mind Today ?</h1>
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

      <div className="dashboard-footer">
        <form className="input-box" onSubmit={handleSubmitMessage}>
          <input
            type="text"
            className="input"
            placeholder="Ask que"
            value={chatInput}
            onChange={(e) => setchatInput(e.target.value)}
          />

          <button className="sendIcon" disabled={!chatInput.trim()}>
            <RiArrowUpLine size={"1.5rem"} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
