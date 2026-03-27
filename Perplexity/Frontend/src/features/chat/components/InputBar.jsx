import React from 'react'

const InputBar = () => {
  return (
    <div className="inputBar">
        <form className="input-box" onSubmit={handleSubmitMessage}>
          <input
            type="text"
            className="input"
            placeholder="Ask anything"
            value={chatInput}
            onChange={(e) => setchatInput(e.target.value)}
          />

          <button className="sendIcon" disabled={!chatInput.trim()}>
            <RiArrowUpLine size={"1.5rem"} />
          </button>
        </form>
      </div>
  )
}

export default InputBar
