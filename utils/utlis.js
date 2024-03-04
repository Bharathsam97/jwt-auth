import jsonwebtoken from "jsonwebtoken";
import { config } from "dotenv";
config();

const secretKey = process.env.JWT_TOKEN_SECRECT || 'YoAmigos';

const generateAWT = async (user,fromFunc) => {

  const idVal = fromFunc =='fromLogin' ? user._id : user.userId;

  console.log(idVal,"idVal")

    try {
        return jsonwebtoken.sign({ userId: idVal }, secretKey, { expiresIn: '1h' });
    }
    catch (error) {
        console.error('Error creating token:', error);
        throw error;
    }
}


const authenticateToken = (req, res, next) => {
    const token = req.cookies.AWTToken;
  
    if (!token) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
  
    jsonwebtoken.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
  
      req.user = decoded;
      next();
    });
  };


  const refreshAccessToken =  (req, res) => {
    const token = req.cookies.AWTToken;
    if (!token) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
  
    jsonwebtoken.verify(token, secretKey, async(err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Authentication failed' });
      }

      console.log(decoded,"decoded");
  
      const newToken = await generateAWT(decoded,'fromRefresh');
      console.log("newToken",newToken);
      res.cookie('AWTToken', newToken, { httpOnly: true, secure: true, sameSite: 'strict' });
      res.json({ message: 'Token refreshed successfully' });
    });
  };

export {generateAWT,authenticateToken,refreshAccessToken};