import React from "react";
import closeIcon from "../../icons/closeIcon.png";
import onlineIcon from "../../icons/onlineIcon.png";

const InfoBar = ({ room }) => {
  return (
    <div className="flex justify-between items-center w-4/6 bg-white rounded-t-xl p-4 shadow-xl pt-6">
      <div className="flex">
        <img
          src={onlineIcon}
          alt="online"
          className="h-3 ml-5 place-self-center"
        />
        <h3 className="ml-1 place-self-center">{room}</h3>
      </div>
      <div>
        <a href="/">
          <img src={closeIcon} alt="close" className="h-7 p-2" />
        </a>
      </div>
    </div>
  );
};

export default InfoBar;
