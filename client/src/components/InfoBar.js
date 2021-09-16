import React from "react";
import closeIcon from "../../icons/closeIcon.png";
import onlineIcon from "../../icons/onlineIcon.png";

const InfoBar = ({ room }) => {
  return (
    <div className="flex justify-between items-center border-black border-2 w-4/6">
      <div className="flex">
        <img src={onlineIcon} alt="online image" className="h-6 ml-2" />
        <h3 className="ml-4 flex items-center">{room}</h3>
      </div>
      <div>
        <a href="/">
          <img src={closeIcon} alt="close image" />
        </a>
      </div>
    </div>
  );
};

export default InfoBar;
