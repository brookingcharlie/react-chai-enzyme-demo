import React from 'react';
import ReactDOM from 'react-dom';
import MessageList from './component/MessageList';

const messageList = [
  'Test message',
  'Another test message',
  'Yet another test message'
];

ReactDOM.render(
  <MessageList messageList={messageList} />,
  document.getElementById('main')
);
