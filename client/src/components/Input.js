import React from "react";

const Input = ({ message, setMessage, sendMessage }) => {
  return (
    <form className="flex justify-between items-center border-black border-2 w-4/6">
      <input
        type="text"
        value={message}
        placeholder="Type a message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
        onKeyPress={(event) =>
          event.key === "Enter" ? sendMesssage(event) : null
        }
        className="p-4 w-full outline-none"
      />
      <button
        onClick={(event) => sendMessage(event)}
        className="border-black border-l-2 p-4"
      >
        Send
      </button>
    </form>
  );
};

export default Input;
