// utils
import makeValidation from '@withvoid/make-validation';
// models
import UserModel, { USER_TYPES } from '../models/User.js';
//Encrypt
import bcrypt from 'bcrypt'

export default {
    onGetAllUsers: async (req, res) => { 
      try {
        const users = await UserModel.getUsers();
        return res.status(200).json({ success: true, users });
      } catch (error) {
        return res.status(500).json({ success: false, error: error })
      }
    },
    onGetUserById: async (req, res) => {
      try {
        const user = await UserModel.getUserById(req.params.id);
        return res.status(200).json({ success: true, user });
      } catch (error) {
        return res.status(500).json({ success: false, error: error })
      }
     },
    onCreateUser: async (req, res) => {
      try {
        const validation = makeValidation(types => ({
          payload: req.body,
          checks: {
            pseudo: { type: types.string },
            email: { type: types.string },
            password: { type: types.string },
            type: { type: types.enum, options: { enum: USER_TYPES } },
          }
        }));
        if (!validation.success) return res.status(400).json(validation);
  
        const salt = await bcrypt.genSalt(10);
        const { pseudo, email, password, type } = req.body;
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await UserModel.createUser(pseudo, email, hashedPassword, type);
        return res.status(200).json({ success: true, user });
      } catch (error) {
        return res.status(500).json({ success: false, error: error })
      }
    },
    onDeleteUserById: async (req, res) => {
      try {
        const user = await UserModel.deleteByUserById(req.params.id);
        return res.status(200).json({ 
          success: true, 
          message: `Deleted a count of ${user.deletedCount} user.` 
        });
      } catch (error) {
        return res.status(500).json({ success: false, error: error })
      }
    },
  }