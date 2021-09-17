import React from "react";
import Message from "./Message";

import ScrollToBottom from "react-scroll-to-bottom";

const Messages = ({ messages, name }) => (
  <ScrollToBottom className="overflow-auto w-4/6 p-4 h-4/6 bg-white">
    {messages.map((message) => (
      <Message message={message} name={name} />
    ))}
  </ScrollToBottom>
);

export default Messages;
