import { motion } from 'framer-motion';
import React from 'react';

const Message = ({ message: { user, text, pfpSrc }, name }) => {
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
      className="grid grid-cols-6"
    >
      <div className="col-start-1 col-end-6">
        <div className="flex flex-col ml-auto p-2 rounded-t-xl rounded-l-xl bg-green-100 shadow-md m-2 w-max max-w-xs lg:max-w-lg overflow-hidden">
          <p className="text-green-900 text-sm font-semibold">{trimmedName}</p>
          <p className="pr-2 text-gray-600">{text}</p>
        </div>
      </div>
      <div className="col-start-6 col-end-7 text-center">
        <img className="inline object-cover w-14 h-14 rounded-full" src={pfpSrc} alt={`Profile image-${user}`} />
        <br />
      </div>
    </motion.div>
  ) : isAdmin ? (
    // Admin message
    <motion.div
      className="flex mx-auto px-3 py-1 rounded-2xl bg-blue-100 w-max shadow-sm my-2 overflow-hidden"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div>
        <p className="text-blue-400 w-auto">{text}</p>
      </div>
    </motion.div>
  ) : (
    // Other user's message
    <motion.div
      initial={{ scale: 0, x: '-70%', opacity: 0.3 }}
      animate={{ scale: 1, x: 0, opacity: 1 }}
      className="grid grid-cols-6"
    >
      <div className="col-start-1 col-end-2 text-center">
        <img className="inline object-cover w-14 h-14 rounded-full" src={pfpSrc} alt="Profile image" />
        <br />
      </div>
      <div className="col-start-2 col-end-7">
        <div className="flex flex-col items-start p-2 rounded-t-xl rounded-r-xl w-max max-w-xs bg-green-500 shadow-md text-white m-2 overflow-hidden lg:max-w-lg">
          <p className="text-sm font-semibold">{user}</p>
          <p className="pr-2">{text}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Message;
