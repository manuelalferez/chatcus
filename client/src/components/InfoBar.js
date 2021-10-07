import React from "react";
import closeIcon from "../../icons/closeIcon.png";
import onlineIcon from "../../icons/onlineIcon.png";
import { ShareButton } from "./Share";

const InfoBar = ({ room, name }) => {
  return (
    <div className="flex justify-between items-center w-5/6 md:w-4/6 lg:w-3/6 bg-white rounded-t-xl p-4 shadow-t-3xl pt-6 border-b-2 border-blue-50">
      <div className="flex items-center">
        <img
          src={onlineIcon}
          alt="online"
          className="h-3 ml-5 place-self-center"
        />
        <h3 className="ml-1 place-self-center">{room}</h3>
        <ShareButton
          link={encodeURIComponent(
            `https://chatcus.vercel.app/#/?room=${room}`
          )}
          text={`Hay! ${name} invites you to join ${room} Chat Room on Chatcus`}
        />
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
