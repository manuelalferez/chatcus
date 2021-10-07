import React, { useState } from "react";
import sendIcon from "../../icons/sendIcon.png";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

const Input = ({ message, setMessage, sendMessage }) => {
  const [showEmoji, setShowEmoji] = useState(false);
  return (
    <form className="flex justify-between items-center bg-white rounded-b-xl shadow-xl w-5/6 md:w-4/6 lg:w-3/6 lg:w-3/6 border-t-4 border-blue-50">
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
      {showEmoji && (
        <span className="absolute bottom-28 right-36">
          <Picker
            onSelect={(e) => setMessage(message + e.native)}
            emojiTooltip={true}
          />
        </span>
      )}
      <p onClick={() => setShowEmoji(!showEmoji)} className="cursor-pointer">
        {String.fromCodePoint(0x1f60a)}
      </p>
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
