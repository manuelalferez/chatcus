import React from 'react';

import sendIcon from '../assets/icons/sendIcon-green.png';

const Input = ({ message, setMessage, sendMessage }) => {
  return (
    <form
      className="flex justify-between items-center bg-white shadow-xl w-full border-t-4 border-blue-50 h-16"
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
        className="w-full h-full px-4 outline-none text-gray-600 font-medium"
      />
      <button type="submit" className="px-6 h-full hover:bg-green-100 transition duration-150 ease-in">
        <img src={sendIcon} className="w-8 h-8 place-self-center" alt="Send Message" />
      </button>
    </form>
  );
};

export default Input;
