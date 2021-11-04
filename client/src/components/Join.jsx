import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import useStore from '../utils/store';

import { TextField } from './atoms/TextField';
import Navbar from './Navbar';

const Join = ({ location, history }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [pfpSrc, setPfpSrc] = useState('');

  const store = useStore((state) => state);

  const [errors, setErrors] = useState({ name: '', room: '' });
  useEffect(() => {
    store.resetStore();

    const { room } = queryString.parse(location.search);
    if (room) {
      setRoom(room);
    }
  }, []);
  return (
    <div className="flex flex-col items-center h-screen bg-green-50">
      <Navbar />
      <h1 className="text-3xl md:text-6xl mt-32 h-24 md:h-28 mb-10 md:p-2 overflow-y-hidden text-green-700 font-pacifico">
        Welcome to Chatcus!
      </h1>

      <form
        id="form"
        noValidate
        className="flex flex-col sm:text-sm md:text-lg overflow-visible bg-green-50"
        autoComplete="off"
      >
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
              if (!name) err.name = 'Required: Name';
              if (!room) err.room = 'Required: Room';
              setErrors(err);
              return event.preventDefault();
            }

            // Set state in store
            store.setName(name);
            store.setRoom(room);
            store.setPfpSrc(pfpSrc || `https://robohash.org/${name.split(' ').join('-')}?set=set4`);

            history.push(`/chat`);
          }}
          className="bg-green-700 text-white mt-4 sm:text-sm md:text-lg p-4 rounded-md hover:bg-green-900"
          type="button"
        >
          Sign in
        </button>
      </form>
      <img
        src="https://ik.imagekit.io/manuelalferez/chatcus/chatcus-logo_sCZmSyqGThv.png?updatedAt=1636049348436"
        className="pt-32"
      />
    </div>
  );
};

export default Join;
