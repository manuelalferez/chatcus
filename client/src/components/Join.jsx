import queryString from 'query-string';
import React, { useEffect, useState } from 'react';

import { TextField } from './atoms/TextField';
import Navbar from './Navbar';

const Join = ({ location, history }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [pfpSrc, setPfpSrc] = useState('');
  const [errors, setErrors] = useState({ name: '', room: '' });
  useEffect(() => {
    const { room } = queryString.parse(location.search);
    console.log(queryString.parse(location.search));
    if (room) {
      setRoom(room);
    }
  }, []);
  return (
    <div className="flex flex-col items-center h-screen">
      <Navbar />
      <h1 className="sm:text-3xl md:text-5xl mt-40 mb-10 overflow-y-hidden">Welcome to Chatcus!</h1>

      <form id="form" noValidate className="flex flex-col sm:text-sm md:text-lg overflow-visible" autoComplete="off">
        <TextField
          attributes={{ type: 'text', id: 'name', name: 'name', required: true, label: 'Name' }}
          values={{ fieldValue: name, error: errors.name }}
          actions={{
            setValue: (e) => {
              setName(e.target.value);
              setErrors((errors) => ({ ...errors, name: '' }));
            },
          }}
        />
        <TextField
          attributes={{ type: 'text', id: 'room', name: 'room', required: true, label: 'Room' }}
          values={{ fieldValue: room, error: errors.room }}
          actions={{
            setValue: (e) => {
              setRoom(e.target.value);
              setErrors((errors) => ({ ...errors, room: '' }));
            },
          }}
        />
        <TextField
          attributes={{ type: 'url', id: 'pfpSrc', name: 'pfpSrc', required: true, label: 'Profile Picture Link' }}
          values={{ fieldValue: pfpSrc }}
          actions={{
            setValue: (e) => {
              setPfpSrc(e.target.value);
            },
          }}
        />
        <button
          onClick={(event) => {
            if (!name || !room) {
              const err = { name: '', room: '' };
              if (!name) err.name = 'Name is Required';
              if (!room) err.room = 'Room is Required';
              setErrors(err);
              return event.preventDefault();
            }
            history.push(`/chat?name=${name}&room=${room}&pfp=${pfpSrc}`);
          }}
          className="bg-green-700 text-white mt-4 sm:text-sm md:text-lg p-4 rounded-md hover:bg-green-900"
          type="button"
        >
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Join;
