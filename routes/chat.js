import express from 'express';
// controllers
import chat from '../controllers/chat.js';

const router = express.Router();

router
  .get('/', chat.getRecentConversation)
  .get('/:roomId', chat.getConversationByRoomId)
  .post('/initiate', chat.initiate)
  .post('/:roomId/message', chat.postMessage)
  .put('/:roomId/mark-read', chat.markConversationReadByRoomId)

export default router;