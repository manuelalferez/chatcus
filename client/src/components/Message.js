import React from "react";

const Message = ({ message: { user, text }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();
  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }
  return isSentByCurrentUser ? (
    <div className="flex w-4/6 justify-end">
      <p className="text-blue-800 pr-2">{trimmedName}</p>
      <div>
        <p className="pr-2">{text}</p>
      </div>
    </div>
  ) : (
    <div className="flex w-4/6 justify-start">
      <p className="pr-2">{user}</p>
      <div>
        <p className="pl-2">{text}</p>
      </div>
    </div>
  );
};

export default Message;
