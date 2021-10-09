import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { io } from "socket.io-client";
import InfoBar from "./InfoBar";
import Input from "./Input";
import Messages from "./Messages";
import { showNotification } from "../utils/notification";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const ENDPOINT = "https://chatcus.herokuapp.com/";

  useEffect(() => {
    const { name, room, pfp: pfpSrc } = queryString.parse(location.search);
    setName(name);
    setRoom(room);

    socket = io(ENDPOINT, {
      transports: ["websocket"],
    });

    socket.emit("join", { name, room, pfpSrc }, (error) => {
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
      showNotification(message);
      setMessages((messages) => [...messages, message]);
    });
  }, []);

  const sendMessage = (message, callback) => {
    if (message) {
      socket.emit("sendMessage", message, () => callback());
    }
  };

  return (
    <div className="flex flex-col items-center pt-16 bg-green-50 h-screen">
      <InfoBar room={room} name={name} />
      <Messages messages={messages} name={name} />
      <Input
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </div>
  );
};

export default Chat;
