import React, { useEffect, useState } from 'react';
import { sendMessage, getMessages } from './api';

const ChatRoom = ({ roomId, userId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const fetchMessages = async () => {
    const msgs = await getMessages(roomId);
    setMessages(msgs);
  };

  const handleSend = async () => {
    if (!input) return;
    await sendMessage(roomId, userId, input);
    setInput('');
    fetchMessages(); // refresh chat
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div>
      <h3>Room ID: {roomId}</h3>
      <div style={{ height: 300, overflowY: 'scroll' }}>
        {messages.map((msg, idx) => (
          <div key={idx}><strong>{msg.senderId}:</strong> {msg.content}</div>
        ))}
      </div>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default ChatRoom;
