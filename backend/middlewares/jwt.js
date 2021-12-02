import jwt from 'jsonwebtoken';
// models
import UserModel from '../models/User.js';

import bcrypt from 'bcrypt'

export const encode = async (req, res, next) => {
  try {
    const { pseudo, password } = req.body;
    const user = await UserModel.getUserByPseudo(pseudo);

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword)
        return res.status(400).send("Invalid email or password");

    const payload = {
      userId: user._id,
      userType: user.type,
    };

    const authToken = jwt.sign(payload, process.env.JWTPRIVATEKEY);

    console.log('Auth', authToken);

    delete user.password

    req.authToken = authToken;
    req.user = user
    
    next();
  } catch (error) {
    console.log('Error : ', error);
    return res.status(400).json({ success: false, message: error.error });
  }
}

export const decode = (req, res, next) => {
  if (!req.headers['authorization']) {
    return res.status(400).json({ success: false, message: 'No access token provided' });
  }

  const accessToken = req.headers.authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(accessToken, process.env.JWTPRIVATEKEY);
    
    req.userId = decoded.userId;
    req.userType = decoded.type;

    return next();
  } catch (error) {

    return res.status(401).json({ success: false, message: error.message });
  }
}