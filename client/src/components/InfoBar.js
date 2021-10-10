import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import closeIcon from "../../icons/closeIcon.png";
import onlineIcon from "../../icons/onlineIcon.png";
import { NotificationBar } from "./atoms/Notification";
import { ShareButton } from "./Share";
import { requestPermission } from "../utils/notification";
import { Modal } from "./atoms/Modal";

const InfoBar = ({ room, name }) => {
  const history = useHistory();
  const [showPermissionMsg, setShowPermissionMsg] = useState(false);
  const [showCloseModal, setShowCloseModal] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowPermissionMsg(true);
    }, 10000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <React.Fragment>
      {showPermissionMsg && Notification.permission === "default" ? (
        <NotificationBar
          variant="default"
          header={`Hi ${name}`}
          message="Click here to get notification of all incoming messages"
          onClose={() => setShowPermissionMsg(false)}
          onBodyClick={() => {
            requestPermission();
            setShowPermissionMsg(false);
          }}
        />
      ) : null}
      <div className="flex justify-between items-center w-5/6 md:w-4/6 lg:w-3/6 bg-white rounded-t-xl p-4 shadow-t-3xl pt-6 border-b-2 border-blue-50">
        <div className="flex items-center">
          <img
            src={onlineIcon}
            alt="online"
            className="h-3 ml-5 place-self-center"
          />
          <h3 className="ml-1 place-self-center">{room}</h3>
          <ShareButton
            link={`${window.location.origin}/#/?room=${room}`}
            text={`Hey! ${name} invites you to join ${room} Chat Room on Chatcus`}
          />
        </div>
        <div>
          <button type="button" onClick={() => setShowCloseModal(true)}>
            <img src={closeIcon} alt="close" className="h-7 p-2" />
          </button>
        </div>
      </div>
      {showCloseModal && (
        <Modal
          data={{ header: "You are about to exist the chat room" }}
          actions={{
            onCancel: () => setShowCloseModal(false),
            onConfirm: () => history.push("/"),
          }}
        />
      )}
    </React.Fragment>
  );
};

export default InfoBar;
