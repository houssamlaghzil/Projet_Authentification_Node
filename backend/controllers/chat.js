// utils
import makeValidation from '@withvoid/make-validation';
// models
import ChatModel from '../models/Chat.js';
import MessageModel from '../models/Message.js';
import UserModel from '../models/User.js';

export default {
  initiate: async (req, res) => {
    try {
      const validation = makeValidation(types => ({
        payload: req.body,
        checks: {
          userIds: { 
            type: types.array, 
            options: { unique: true, empty: false, stringOnly: true } 
          },
        }
      }));

      if (!validation.success) return res.status(400).json({ ...validation });
  
      const { userIds } = req.body;
      const { userId: chatInitiator } = req;
      const allUserIds = [...userIds, chatInitiator];
      const chatRoom = await ChatModel.initiateChat(allUserIds, chatInitiator);

      return res.status(200).json({ success: true, chatRoom });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  },
  postMessage: async (req, res) => {
    try {
      const { chatId } = req.params;
      const validation = makeValidation(types => ({
        payload: req.body,
        checks: {
          messageText: { type: types.string },
        }
      }));

      if (!validation.success) return res.status(400).json({ ...validation });
  
      const messagePayload = {
        messageText: req.body.messageText,
      };
      
      const currentLoggedUser = req.userId;
      const post = await MessageModel.createPostInChat(chatId, messagePayload, currentLoggedUser);

      global.io.sockets.in(chatId).emit('new message', { message: post });

      return res.status(200).json({ success: true, post });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  },
  getRecentConversation: async (req, res) => { 
    try {
      const chats = await ChatModel.getChats();
      return res.status(200).json({ success: true, chats });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  },
  getConversationByChatId: async (req, res) => {
    try {
      const { chatId } = req.params;
      const chat = await ChatModel.getChatById(chatId)

      if (!chat) {
        return res.status(400).json({
          success: false,
          message: 'No room exists for this id',
        })
      }

      const users = await UserModel.getUserByIds(chat.userIds);
      const options = {
        page: parseInt(req.query.page) || 0,
        limit: parseInt(req.query.limit) || 10,
      };

      const conversation = await MessageModel.getConversationByChatId(chatId, options);
      
      return res.status(200).json({
        success: true,
        conversation,
        users,
      });
    } catch (error) {
      return res.status(500).json({ success: false, error });
    }
  },
}