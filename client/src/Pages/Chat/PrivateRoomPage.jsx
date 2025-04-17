import React, { useState } from 'react';
import { createRoom } from './api';

const PrivateRoomPage = () => {
  const [roomName, setRoomName] = useState('');
  const [members, setMembers] = useState('');

  const handleCreateRoom = async () => {
    const memberArray = members.split(',').map(id => id.trim());
    try {
      const res = await createRoom(roomName, memberArray);
      alert('Room created! Room ID: ' + res.data._id);
    } catch (error) {
      console.error(error);
      alert('Error creating room');
    }
  };

  return (
    <div className="p-4">
      <h2>Create Private Chat Room</h2>
      <input placeholder="Room Name" value={roomName} onChange={e => setRoomName(e.target.value)} />
      <input placeholder="User IDs (comma-separated)" value={members} onChange={e => setMembers(e.target.value)} />
      <button onClick={handleCreateRoom}>Create Room</button>
    </div>
  );
};

export default PrivateRoomPage;
