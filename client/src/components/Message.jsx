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
    <div className="grid grid-cols-6">
      <div className="col-start-1 col-end-6">
        <div className="flex flex-col max-w-xs p-2 m-2 ml-auto overflow-hidden bg-green-100 shadow-md rounded-t-xl rounded-l-xl w-max lg:max-w-lg">
          <p className="pr-2 text-green-900">{text}</p>
        </div>
      </div>
      <div className="col-start-6 col-end-7 text-center">
        <img
          className="inline object-cover w-8 h-8 rounded-full"
          src="https://cdn-icons-png.flaticon.com/512/709/709722.png"
          alt="Foo eating a sandwich."
        />
        <br />
        <div>
          <p className="pr-2">{trimmedName}</p>
        </div>
      </div>
    </div>
  ) : isAdmin ? (
    <div className="flex p-2 mx-auto my-2 overflow-hidden bg-gray-200 shadow-md rounded-2xl w-max">
      <div>
        <p className="w-auto text-gray-400">{text}</p>
      </div>
    </div>
  ) : (
    <div className="grid grid-cols-6">
      <div className="col-start-1 col-end-2 text-center">
        <img
          className="inline object-cover w-8 h-8 rounded-full"
          src="https://cdn-icons-png.flaticon.com/512/709/709722.png"
          alt="Foo eating a sandwich."
        />
        <br />
        <div>
          <p className="pr-2">{user}</p>
        </div>
      </div>
      <div className="col-start-2 col-end-7">
        <div className="flex flex-col items-start max-w-xs p-2 m-2 overflow-hidden text-white bg-green-500 shadow-md rounded-t-xl rounded-r-xl w-max lg:max-w-lg">
          <p className="pr-2 text-green-100">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
