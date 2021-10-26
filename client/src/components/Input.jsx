import React from 'react';

import sendIcon from '../assets/icons/sendIcon-green.png';

const Input = ({ message, setMessage, sendMessage }) => {
  return (
    <form
      className="flex justify-between items-center bg-white shadow-xl w-full border-t-4 border-blue-50"
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
        className="p-4 w-full outline-none text-gray-500 font-medium"
      />
      <button type="submit" className="p-4 hover:bg-green-100 transition duration-150 ease-in">
        <img src={sendIcon} className="px-2 w-12 place-self-center" alt="Send Message" />
      </button>
    </form>
  );
};

export default Input;
