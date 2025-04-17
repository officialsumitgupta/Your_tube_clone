import axios from 'axios';
import CryptoJS from 'crypto-js';

const API = axios.create({ baseURL: 'http://localhost:5000' }); // adjust if needed
const secret = "your_secret_key"; // must match backend

export const encryptMessage = (msg) => {
  return CryptoJS.AES.encrypt(msg, secret).toString();
};

export const decryptMessage = (cipherText) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, secret);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const createRoom = async (roomName, members) => {
  return await API.post('/chat/create', { roomName, members });
};

export const sendMessage = async (roomId, senderId, content) => {
  const encrypted = encryptMessage(content);
  return await API.post('/chat/send', { roomId, senderId, content: encrypted });
};

export const getMessages = async (roomId) => {
  const res = await API.get(`/chat/messages/${roomId}`);
  return res.data.map(msg => ({
    ...msg,
    content: decryptMessage(msg.content)
  }));
};
