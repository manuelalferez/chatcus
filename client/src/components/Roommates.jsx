import { motion } from 'framer-motion';
import * as React from 'react';
import useStore from '../utils/store';

const Roommates = () => {
  const roommates = useStore((state) => state.roommates);
  const currentUsername = useStore((state) => state.name);

  return (
    <div className="flex flex-col pb-2">
      <div className="w-full px-3 py-2 bg-white text-green-800 font-medium text-sm">Participants: {roommates.length}</div>
      {roommates &&
        roommates.map((roommate) => (
          <RoommateName
            name={roommate.name === currentUsername ? `${roommate.name} (You)` : roommate.name}
            pfpSrc={roommate.pfpSrc}
            key={roommate.name}
          />
        ))}
    </div>
  );
};

const RoommateName = ({ name, pfpSrc }) => {
  return (
    <motion.div
      className="grid grid-cols-5 items-center
      px-3 py-2
      bg-white hover:bg-green-100 cursor-pointer
      transition-all duration-150 ease-out"
      initial={{
        opacity: 0,
        x: '100%',
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
    >
      <div className="col-span-1 flex">
        <img className="w-8 h-8 rounded-full border-2 border-green-200" src={pfpSrc} alt={name} />
      </div>
      <div className="col-span-4 font-semibold text-gray-500">{name}</div>
    </motion.div>
  );
};

export default Roommates;
