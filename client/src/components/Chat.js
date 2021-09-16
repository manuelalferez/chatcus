import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { io } from "socket.io-client";
import InfoBar from "./InfoBar";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    setName(name);
    setRoom(room);

    socket = io(ENDPOINT, {
      transports: ["websocket"],
    });

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });
  }, []);

  const sendMesssage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  console.log(message, messages);

  return (
    <div className="flex flex-col items-center mt-16">
      <InfoBar room={room} />
      <input
        value={message}
        onChange={(event) => {
          setMessage(event.target.value);
        }}
        onKeyPress={(event) =>
          event.key === "Enter" ? sendMesssage(event) : null
        }
      />
    </div>
  );
};

export default Chat;
