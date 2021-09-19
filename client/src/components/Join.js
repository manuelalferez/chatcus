import React, { useState } from "react";
import { Link } from "react-router-dom";

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div className="flex flex-col items-center h-screen">
      <h1 className="text-5xl mt-40 mb-10">Welcome to Chatcus!</h1>
      <div className="flex flex-col text-lg">
        <input
          placeholder="Name"
          className="w-70 mb-2 p-2 bg-green-100 outline-none"
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        ></input>
        <input
          placeholder="Room"
          className="w-70 p-2 bg-green-100 outline-none"
          type="text"
          onChange={(event) => {
            setRoom(event.target.value);
          }}
        ></input>
      </div>
      <Link
        onClick={(event) => (!name || !room ? event.preventDefault() : null)}
        to={`/chat?name=${name}&room=${room}`}
      >
        <button
          className="bg-green-700 text-white mt-4 p-4 rounded-md hover:bg-green-900"
          type="submit"
        >
          Sign in
        </button>
      </Link>
    </div>
  );
};

export default Join;
