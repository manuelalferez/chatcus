import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Join = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  useEffect(() => {
    const { room } = queryString.parse(location.search);
    console.log(queryString.parse(location.search));
    if (room) {
      setRoom(room);
    }
  }, []);
  return (
    <div className="flex flex-col items-center h-screen">
      <h1 className="mt-40 mb-10 overflow-y-hidden sm:text-3xl md:text-5xl">
        Welcome to Chatcus!
      </h1>
      <div className="flex flex-col sm:text-sm md:text-lg">
        <input
          placeholder="Name"
          className="p-2 mb-2 bg-green-100 outline-none w-70"
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        ></input>
        <input
          placeholder="Room"
          className="p-2 bg-green-100 outline-none w-70"
          type="text"
          value={room}
          onChange={(event) => {
            setRoom(event.target.value);
          }}
        ></input>
      </div>
      <Link
        onClick={(event) => {
          if(!name || !room){
            alert("Username and room are required!");
            return event.preventDefault();
          }
          return null;
        }}
        to={`/chat?name=${name}&room=${room}`}
      >
        <button
          className="p-4 mt-4 text-white bg-green-700 rounded-md sm:text-sm md:text-lg hover:bg-green-900"
          type="submit"
        >
          Sign in
        </button>
      </Link>
    </div>
  );
};

export default Join;
