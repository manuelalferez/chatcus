import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import '../styles/Typers.css';
const Typers = ({ typers }) => {
  let typerExists = Boolean(typers.size);
  const typerArr = Array.from(typers);
  let message;

  if (typers.size) {
    typerExists = true;
    console.log(typers);
    const subjective =
      typers.size == 1
        ? typerArr[0]
        : typers.size == 2
        ? `${typerArr[0]} and ${typerArr[1]}`
        : `${typerArr[0]} and ${typers.size - 1} other users`;
    const verbal = typers.size == 1 ? 'is typing' : 'are typing';
    message = `${subjective} ${verbal}`;
  }

  return (
    <CSSTransition
      in={typerExists}
      timeout={300}
      classNames="alert"
      unmountOnExit
      onEnter={() => (typerExists = true)}
      onExited={() => (typerExists = false)}
    >
      <div
        className={`flex mx-auto px-3 py-1${typerExists ? ' bg-blue-100' : ''} rounded-2xl w-max my-2 overflow-hidden`}
      >
        <p className="text-blue-400 w-auto">{message}</p>
        <div className="relative w-11 h-6 rounded-full">
          <div className="delay-150 absolute m-2 w-2 h-2 rounded-full bg-green-300 animate-ping"></div>
          <div className="absolute m-2 w-2 h-2 rounded-full bg-green-300"></div>
          <div className="absolute my-2 ml-5 w-2 h-2 rounded-full bg-green-300 animate-ping"></div>
          <div className="absolute my-2 ml-5 w-2 h-2 rounded-full bg-green-300"></div>
          <div className="absolute my-2 ml-8 w-2 h-2 rounded-full bg-green-300 animate-ping"></div>
          <div className="absolute my-2 ml-8 w-2 h-2 rounded-full bg-green-300"></div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Typers;
