import React from "react";
import Message from "./Message";

const Messages = ({ messages, name }) => {
  return messages.map((message) => <Message message={message} name={name} />);
};

export default Messages;
