import express from 'express';
// controllers
import chat from '../controllers/chat.js';

const router = express.Router();

router
  .get('/', chat.getRecentConversation)
  .get('/:chatId', chat.getConversationByChatId)
  .post('/initiate', chat.initiate)
  .post('/:chatId/message', chat.postMessage)

export default router;