import React from 'react';

import sendIcon from '../assets/icons/sendIcon-green.png';

const Input = ({ message, setMessage, sendMessage }) => {
  return (
    <form
      className="flex items-center justify-between w-5/6 bg-white border-t-4 shadow-xl rounded-b-xl md:w-4/6 lg:w-3/6 border-blue-50"
      onSubmit={(e) => {
        e.preventDefault();
        console.log(`Your message: ${message}`);
        sendMessage(message, () => {
          setMessage('');
        });
      }}
    >
      <input
        type="text"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Type a message..."
        className="w-full p-4 text-gray-800 outline-none rounded-bl-xl"
      />
      <button
        type="submit"
        className="p-4 transition duration-150 ease-in rounded-br-xl hover:bg-green-100"
      >
        <img src={sendIcon} className="w-12 px-2 place-self-center" alt="" />
      </button>
    </form>
  );
};

export default Input;
