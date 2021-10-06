import React from "react";

const Message = ({ message: { user, text }, name }) => {
  let isSentByCurrentUser = false;
  let isAdmin = false;

  const trimmedName = name.trim().toLowerCase();
  if (user === "admin") {
    isAdmin = true;
  } else if (user === trimmedName) {
    isSentByCurrentUser = true;
  }
  return isSentByCurrentUser ? (
    <div class="grid grid-cols-6">
      <div class="col-start-1 col-end-6">
        <div className="flex flex-col ml-auto p-2 rounded-t-xl rounded-l-xl bg-green-100 shadow-md m-2 w-max max-w-xs lg:max-w-lg overflow-hidden">
          <p className="text-green-900 pr-2">{text}</p>
        </div>
      </div>
      <div class="col-start-6 col-end-7 text-center">
        <img class="inline object-cover w-8 h-8 rounded-full" src="https://cdn-icons-png.flaticon.com/512/709/709722.png" alt="Profile image"/><br/>
        <div>
          <p className="pr-2">{trimmedName}</p>
        </div>
      </div>
    </div>
  ) : isAdmin ? (
    <div className="flex mx-auto p-2 rounded-2xl bg-gray-200 w-max shadow-md my-2 overflow-hidden">
      <div>
        <p className="text-gray-400 w-auto">{text}</p>
      </div>
    </div>
  ) : (
    <div class="grid grid-cols-6">
      <div class="col-start-1 col-end-2 text-center">
        <img class="inline object-cover w-8 h-8 rounded-full" src="https://cdn-icons-png.flaticon.com/512/709/709722.png" alt="Profile image"/><br/>
        <div>
          <p className="pr-2">{user}</p>
        </div>
      </div>
      <div class="col-start-2 col-end-7">
      <div className="flex flex-col items-start p-2 rounded-t-xl rounded-r-xl w-max max-w-xs bg-green-500 shadow-md text-white m-2 overflow-hidden lg:max-w-lg">
          <p className="text-green-100 pr-2">{text}</p>
        </div>
      </div>
      
    </div>
  );
};

export default Message;
