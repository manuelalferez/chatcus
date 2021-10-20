import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import { showNotification } from '../utils/notification';
import { clearSavedChat, getAllData, storeData } from '../utils/store';
import InfoBar from './InfoBar';
import Input from './Input';
import Messages from './Messages';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT =
    import.meta.env.MODE === 'development' ? 'http://localhost:8000/' : 'https://chatcus-prod-dlpvkpimfa-uc.a.run.app';

  useEffect(() => {
    const { name, room, pfp: pfpSrc } = queryString.parse(location.search);
    setName(name);
    setRoom(room);

    getMessagesFromLocalStorage(room);

    socket = io(ENDPOINT, {
      transports: ['websocket'],
      withCredentials: true,
    });

    socket.emit('join', { name, room, pfpSrc }, (error) => {
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
      showNotification(message);
      storeData(message);
      setMessages((messages) => [...messages, message]);
    });
  }, []);

  const sendMessage = (message, callback) => {
    if (message) {
      socket.emit('sendMessage', message, () => callback());
    }
  };

  const getMessagesFromLocalStorage = async (room) => {
    const storedRoom = localStorage.getItem('room');
    console.log(storedRoom, room);
    if (!storedRoom) {
      localStorage.setItem('room', room);
    } else if (storedRoom === room) {
      const chatData = await getAllData();
      if (Array.isArray(chatData) && chatData.length > 0) {
        setMessages((messages) => [...messages, ...chatData]);
      }
    } else {
      await clearSavedChat();
      localStorage.setItem('room', room);
    }
  };

  return (
    <div className="flex flex-col items-center pt-16 bg-green-50 h-screen">
      <InfoBar room={room} name={name} />
      <Messages messages={messages} name={name} />
      <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
    </div>
  );
};

export default Chat;
