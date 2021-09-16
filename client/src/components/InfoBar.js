import React from "react";
import closeIcon from "../../icons/closeIcon";
import onlineIcon from "../../icons/onlineIcon";

const InfoBar = ({ room }) => {
  return (
    <div>
      <div>
        <img src={onlineIcon} alt="online image" />
        <h3>{room}</h3>
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
