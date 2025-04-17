import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  senderId: String,
  content: String, // encrypted message
  timestamp: { type: Date, default: Date.now }
});

const chatRoomSchema = new mongoose.Schema({
  name: String,
  members: [String], // Array of userIds
  messages: [messageSchema],
});

const ChatRoom = mongoose.models.ChatRoom || mongoose.model('ChatRoom', chatRoomSchema);

export default ChatRoom;
