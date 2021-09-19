import React from "react";
import sendIcon from "../../icons/sendIcon.png";

const Input = ({ message, setMessage, sendMessage }) => {
  return (
    <form className="flex justify-between items-center bg-white rounded-b-xl shadow-xl w-4/6 lg:w-3/6 border-t-4 border-blue-50">
      <input
        type="text"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Type a message..."
        onKeyPress={(event) =>
          event.key === "Enter" ? sendMessage(event) : null
        }
        className="p-4 w-full outline-none rounded-bl-xl"
      />
      <button
        onClick={(event) => sendMessage(event)}
        className="p-4 rounded-br-xl"
      >
        <img src={sendIcon} className="px-2 w-12 place-self-center" />
      </button>
    </form>
  );
};

export default Input;
