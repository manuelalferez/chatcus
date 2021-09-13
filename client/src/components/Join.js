import React from "react";
import { Link } from "react-router-dom";

const Join = () => {
  return (
    <div className="flex flex-col items-center h-screen">
      <h1 className="text-5xl mt-40 mb-5">Join</h1>
      <div className="flex flex-col text-lg">
        <input placeholder="Name" className="w-70 mb-2 p-2 bg-red-100 outline-none" type="text"></input>
        <input placeholder="Room" className="w-70 p-2 bg-red-100 outline-none" type="text"></input>
      </div>
      <Link>
        <button className="bg-green-700 text-white mt-4 p-4 rounded-md hover:bg-green-900" type="submit">
          Sign in
        </button>
      </Link>
    </div>
  );
};

export default Join;
