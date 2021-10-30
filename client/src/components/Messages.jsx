import '../styles/Messages.css';

import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message';

const Messages = ({ messages, name }) => (
  <ScrollToBottom className="overflow-auto flex-grow w-full h-4 p-4 bg-white text-sm md:text-lg">
    {messages.map((message, i) => (
      <Message message={message} name={name} key={`${message.user}-${i}`} />
    ))}
  </ScrollToBottom>
);

export default Messages;
