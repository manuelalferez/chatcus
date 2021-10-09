import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import InfoBar from './InfoBar';
import Input from './Input';
import Messages from './Messages';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'https://chatcus.herokuapp.com/';

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    setName(name);
    setRoom(room);

    socket = io(ENDPOINT, {
      transports: ['websocket'],
    });

    socket.emit('join', { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });

    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
    });
  }, []);

  const sendMesssage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  console.log(message, messages);

  return (
    <div className="flex flex-col items-center pt-16 bg-green-50 h-screen">
      <InfoBar room={room} />
      <Messages messages={messages} name={name} />
      <Input message={message} setMessage={setMessage} sendMessage={sendMesssage} />
    </div>
  );
};

export default Chat;
