import React from 'react';

import sendIcon from '../assets/icons/sendIcon.png';

const Input = ({ message, setMessage, sendMessage }) => {
  return (
    <form className="flex items-center justify-between w-5/6 bg-white border-t-4 shadow-xl rounded-b-xl md:w-4/6 lg:w-3/6 border-blue-50">
      <input
        type="text"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Type a message..."
        onKeyPress={(event) => (event.key === 'Enter' ? sendMessage(event) : null)}
        className="w-full p-4 outline-none rounded-bl-xl"
      />
      <button onClick={(event) => sendMessage(event)} className="p-4 rounded-br-xl">
        <img src={sendIcon} className="w-12 px-2 place-self-center" alt="" />
      </button>
    </form>
  );
};

export default Input;
