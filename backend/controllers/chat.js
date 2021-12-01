// utils
import makeValidation from '@withvoid/make-validation';
// models
import ChatModel from '../models/Chat.js';

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
  postMessage: async (req, res) => { },
  getRecentConversation: async (req, res) => { },
  getConversationByRoomId: async (req, res) => { },
}