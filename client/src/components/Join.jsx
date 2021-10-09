import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <div className="flex flex-col items-center h-screen">
      <h1 className="mt-40 mb-10 sm:text-3xl md:text-5xl ">Welcome to Chatcus!</h1>
      <div className="flex flex-col sm:text-sm md:text-lg">
        <input
          placeholder="Name"
          className="p-2 mb-2 bg-green-100 outline-none w-70"
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}></input>
        <input
          placeholder="Room"
          className="p-2 bg-green-100 outline-none w-70"
          type="text"
          onChange={(event) => {
            setRoom(event.target.value);
          }}></input>
      </div>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <Link
        onClick={(event) => (!name || !room ? event.preventDefault() : null)}
        to={`/chat?name=${name}&room=${room}`}>
        <button
          className="p-4 mt-4 text-white bg-green-700 rounded-md sm:text-sm md:text-lg hover:bg-green-900"
          type="submit">
          Sign in
        </button>
      </Link>
    </div>
  );
};

export default Join;
