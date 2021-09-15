import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { io } from "socket.io-client";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    setName(name);
    setRoom(room);

    socket = io(ENDPOINT, {
      transports: ["websocket"],
    });

    socket.emit("join", { name, room });
  }, [ENDPOINT, location.search]);

  return <h1>Chat</h1>;
};

export default Chat;
