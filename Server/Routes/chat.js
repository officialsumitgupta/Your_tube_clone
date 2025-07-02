// 📍 Location: Server/Routes/chat.js

import express from 'express';
import { createChatRoom, sendMessage, getMessages } from '../Controllers/chatController.js';

const router = express.Router();

router.post('/create', createChatRoom);

router.post('/send/:roomId', sendMessage);

router.get('/messages/:roomId', getMessages);

export default router;
