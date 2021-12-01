import express from 'express';
// controllers
import user from '../controllers/user.js';

const router = express.Router();

router
  .get('/', user.onGetAllUsers)
  .get('/:id', user.onGetUserById)
  .put('/:id', user.onUpdateUser)
  .delete('/:id', user.onDeleteUserById)

export default router;