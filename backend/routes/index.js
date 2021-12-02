import express from 'express';
// controllers
import users from '../controllers/user.js';
// middlewares
import { encode, decode } from '../middlewares/jwt.js';

const router = express.Router();

router
  .post('/login', encode, (req, res, next) => {
    return res
      .status(200)
      .json({
        success: true,
        authorization: req.authToken,
        user: req.user
      });
   })
  .post('/register', users.onCreateUser)
  .post('/me', decode, users.onGetMyProfil)

export default router;