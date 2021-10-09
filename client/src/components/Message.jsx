import { motion } from 'framer-motion';
import React from 'react';

const Message = ({ message: { user, text }, name }) => {
  let isSentByCurrentUser = false;
  let isAdmin = false;

  const trimmedName = name.trim().toLowerCase();
  if (user === 'admin') {
    isAdmin = true;
  } else if (user === trimmedName) {
    isSentByCurrentUser = true;
  }
  return isSentByCurrentUser ? (
    // Current user's message
    <motion.div
      initial={{ scale: 0, x: '70%', opacity: 0.3 }}
      animate={{ scale: 1, x: 0, opacity: 1 }}
      className="grid grid-cols-6">
      <div className="col-start-1 col-end-6">
        <div className="flex flex-col max-w-xs p-2 m-2 ml-auto overflow-hidden bg-green-100 shadow-md rounded-t-xl rounded-l-xl w-max lg:max-w-lg">
          <p className="text-sm font-semibold text-green-900">{trimmedName}</p>
          <p className="pr-2 text-gray-600">{text}</p>
        </div>
      </div>
      <div className="col-start-6 col-end-7 text-center">
        <img
          className="inline object-cover w-8 h-8 rounded-full"
          src="https://cdn-icons-png.flaticon.com/512/709/709722.png"
          alt="Profile"
        />
        <br />
      </div>
    </motion.div>
  ) : isAdmin ? (
    // Admin message
    <motion.div
      className="flex px-3 py-1 mx-auto my-2 overflow-hidden bg-blue-100 shadow-sm rounded-2xl w-max"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}>
      <div>
        <p className="w-auto text-blue-400">{text}</p>
      </div>
    </motion.div>
  ) : (
    // Other user's message
    <motion.div
      initial={{ scale: 0, x: '-70%', opacity: 0.3 }}
      animate={{ scale: 1, x: 0, opacity: 1 }}
      className="grid grid-cols-6">
      <div className="col-start-1 col-end-2 text-center">
        <img
          className="inline object-cover w-8 h-8 rounded-full"
          src="https://cdn-icons-png.flaticon.com/512/709/709722.png"
          alt="Profile"
        />
        <br />
      </div>
      <div className="col-start-2 col-end-7">
        <div className="flex flex-col items-start max-w-xs p-2 m-2 overflow-hidden text-white bg-green-500 shadow-md rounded-t-xl rounded-r-xl w-max lg:max-w-lg">
          <p className="text-sm font-semibold">{user}</p>
          <p className="pr-2">{text}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Message;
