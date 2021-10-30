import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import { showNotification } from '../utils/notification';
import useStore from '../utils/store';
import InfoBar from './InfoBar';
import Input from './Input';
import Messages from './Messages';
import Navbar from './Navbar';
import Typers from './Typers';
import Roommates from './Roommates';

let socket;

const Chat = ({ location }) => {
  const [message, setMessage] = useState('');
  const [typers, setTypers] = useState(new Set());

  const { name, room, pfpSrc, messages, setRoommates, addMessage, resetStore } = useStore((state) => state);

  const ENDPOINT =
    import.meta.env.MODE === 'development' ? 'http://localhost:8000/' : 'https://chatcus-prod-dlpvkpimfa-uc.a.run.app';

  useEffect(() => {
    console.log(`ENDPOINT = ${ENDPOINT}`);

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
      socket.emit('leave');
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', (message) => {
      showNotification(message);
      addMessage(message);

      if (message.user === 'admin') setRoommates(message.roommates);
    });
  }, []);

  const sendMessage = (message, callback) => {
    if (message) {
      timeoutHandler();
      socket.emit('sendMessage', message, () => callback());
    }
  };

  useEffect(() => {
    socket.on('typing', ({ user, typing }) => {
      console.log(`${user} has ${typing ? 'started' : 'stopped'} typing.`);
      if (typing) setTypers((_typers) => new Set(_typers).add(user));
      else
        setTypers((_typers) => {
          const dummy = new Set(_typers);
          dummy.delete(user);
          return dummy;
        });
    });
  }, []);

  const timeoutHandler = () => {
    document.typing = false;
    clearTimeout(document.timeout);
    console.log('Timeout for typing finished...');
    document.timeout = null;
    socket.emit('sendTyping', document.typing);
  };

  const onChange = (e) => {
    setMessage(e.target.value);
    document.typing = true;
    if (document.timeout) {
      console.log('Already started writing...');
    } else {
      socket.emit('sendTyping', document.typing);
    }
    clearTimeout(document.timeout);
    document.timeout = setTimeout(timeoutHandler, 4000);
  };

  return (
    <div className="w-screen h-screen bg-green-50">
      <Navbar />
      <div
        className="w-screen h-full flex items-center justify-center
        overflow-hidden"
      >
        <div
          className="relative top-12
          flex flex-col items-center
          h-5/6 w-5/6
          shadow-xl
          overflow-hidden
          rounded-xl"
        >
          <InfoBar room={room} name={name} />
          <div className="grid grid-cols-5 w-full h-full">
            <div className="col-span-4 flex flex-col border-r-2 border-blue-50">
              <Messages messages={messages} name={name} />
              <Typers typers={typers} />
              <Input message={message} setMessage={setMessage} sendMessage={sendMessage} onChange={onChange} />
            </div>
            <div className="col-span-1 bg-white">
              <Roommates />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
