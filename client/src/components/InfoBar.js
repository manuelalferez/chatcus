import React from "react";

const InfoBar = ({ room }) => {
  return (
    <div>
      <div>
        <img alt="online image" />
        <h3>{room}</h3>
      </div>
      <div>
        <a href="/">
          <img alt="close image" />
        </a>
      </div>
    </div>
  );
};

export default InfoBar;
