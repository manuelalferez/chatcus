import React from "react";
import socketClient from "socket.io-client";

const SERVER = "http://127.0.0.1:8080";

const App = () => {
  var socket = socketClient(SERVER);
  
  socket.on("connection", () => {
    console.log("I'm connected with the back-end");
  });

  return <h1>Real-time Chat</h1>;
};

export default App;
