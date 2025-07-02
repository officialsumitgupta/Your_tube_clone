import ChatRoom from '../Models/ChatRoom.js';
import CryptoJS from 'crypto-js';

const secretKey = "your_secret_key"; // store in env for production

// 👇 Rename to match import in router
export const createChatRoom = async (req, res) => {
  const { name, members } = req.body;

  try {
    const newRoom = await ChatRoom.create({ name, members, messages: [] });
    res.status(201).json(newRoom);
  } catch (err) {
    res.status(500).json({ message: "Error creating room", error: err });
  }
};

export const sendMessage = async (req, res) => {
  const { roomId } = req.params;
  const { senderId, message } = req.body;

  try {
    const encryptedMsg = CryptoJS.AES.encrypt(message, secretKey).toString();

    const room = await ChatRoom.findById(roomId);
    if (!room) return res.status(404).json({ message: "Room not found" });

    room.messages.push({ senderId, content: encryptedMsg });
    await room.save();

    res.status(200).json({ message: "Message sent" });
  } catch (err) {
    res.status(500).json({ message: "Error sending message", error: err });
  }
};

export const getMessages = async (req, res) => {
  const { roomId } = req.params;

  try {
    const room = await ChatRoom.findById(roomId);
    if (!room) return res.status(404).json({ message: "Room not found" });

    const decryptedMessages = room.messages.map((msg) => ({
      ...msg._doc,
      content: CryptoJS.AES.decrypt(msg.content, secretKey).toString(CryptoJS.enc.Utf8),
    }));

    res.status(200).json(decryptedMessages);
  } catch (err) {
    res.status(500).json({ message: "Error fetching messages", error: err });
  }
};
