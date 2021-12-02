import jwt from 'jsonwebtoken';

export const authAdmin = (req, res, next) => {
  if (!req.headers['authorization']) {
    return res.status(400).json({ success: false, message: 'No access token provided' });
  }
  const accessToken = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(accessToken, process.env.JWTPRIVATEKEY);
    
    req.userId = decoded.userId;
    req.userType = decoded.userType;
    
    if (req.userType !== 'admin')
        return res.status(400).send("Only admin can access to the API");

    return next();
  } catch (error) {

    return res.status(401).json({ success: false, message: error.message });
  }
}