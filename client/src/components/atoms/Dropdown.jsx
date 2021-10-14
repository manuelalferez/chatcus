import { motion } from 'framer-motion';
import React from 'react';

export const Dropdown = ({ data: { label, menu, showDropdown }, actions: { menuClick, backdropClick } }) => {
  return (
    <React.Fragment>
      <div className="relative inline-block text-left overflow-y-hidden">
        <div className="flex">
          <button
            type="button"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
            onClick={menuClick}
            className="z-10"
          >
            {label}
          </button>
        </div>

        <motion.div
          initial={{ scale: 0, opacity: 0, x: '-70%' }}
          animate={showDropdown ? { scale: 1, x: 0, opacity: 1 } : {}}
          className={`origin-top-right fixed mt-2 w-52 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 `}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          {menu}
        </motion.div>
      </div>
      <div
        style={{ zIndex: showDropdown ? '1' : '-1' }}
        onClick={backdropClick}
        className="w-full h-full fixed left-0 top-0"
      ></div>
    </React.Fragment>
  );
};
