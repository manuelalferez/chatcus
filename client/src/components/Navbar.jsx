import React from 'react';

const Navbar = () => {
  return (
    <div className="w-full fixed top-0 z-10 text-green-700 bg-green-50 flex justify-between p-2 text-green-50	items-center h-16 overflow-y-hidden">
      <img src="https://ik.imagekit.io/manuelalferez/chatcus/tr:w-0.4/brandname_qEVMdzDXuJY.png" className="ml-4" />
      <a
        href="https://github.com/manuelalferez/chatcus"
        target="_blank"
        className="flex items-center rounded-md border-green-700 text-green-700 border-2 p-2 hover:bg-green-100"
      >
        <img src="https://ik.imagekit.io/manuelalferez/chatcus/github_SB4aytK3j.png" />
        <span className="pl-2">GitHub</span>
      </a>
    </div>
  );
};

export default Navbar;
