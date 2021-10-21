import React from 'react';

const Navbar = () => {
  return (
    <div className="w-full fixed top-0 z-10 bg-green-700 flex justify-between p-2 text-green-50	items-center border-b-2 h-16 overflow-y-hidden">
      <img src="https://ik.imagekit.io/manuelalferez/chatcus/tr:w-0.30/logo_FBP3bW1ZWC.png" className="ml-4" />
      <a
        href="https://github.com/manuelalferez/chatcus"
        target="_blank"
        className="flex items-center rounded-md border-green-700 border-2 p-2 hover:text-black hover:bg-green-50"
      >
        <img src="https://ik.imagekit.io/manuelalferez/chatcus/github_7y-K8IT6TGe.svg?updatedAt=1634803536227" />
        <spam className="pl-2">GitHub</spam>
      </a>
    </div>
  );
};

export default Navbar;
