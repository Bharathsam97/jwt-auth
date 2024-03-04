import { User } from "../models/usermodel.js";
import bcrypt from 'bcrypt';
import cookieParser from "cookie-parser";
import {generateAWT} from '../../utils/utlis.js'
// import LandingPage from "../../client/src/LandingPage.js";


const Register= async (req,res) =>{
    try{
        const {email,password} = req.body;

        const newUser= await User.findOne({email:email});
        
        if(newUser){
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt= await bcrypt.genSalt(10);
        const encodedPass = await bcrypt.hash(password,salt);

        const user=new User({email,password:encodedPass});

        const savedUser= await user.save();
        res.status(201).json(savedUser);

    }
    catch (err){
        res.status(500).json({error:err.message});
    }
};


const Login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email: email });
      console.log(user)
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid user' });
      }

      console.log(user);
  
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
  
      // Assuming generateAWT is a function that returns a JWT token
      const awtToken = await generateAWT(user,'fromLogin');
  
      console.log("this",awtToken);

      res.cookie('AWTToken', awtToken, { httpOnly: true, secure: true, sameSite: 'strict' });
      res.json({ message: 'Login successful' });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  const Logout =(req,res) =>{

    res.clearCookie('AWTToken');

  res.json({ message: 'Logout successful' });

  }
  

  const protectedRoute = async (req, res) => {
    try {
      return res.json({ message: 'Access granted', user: req.user });
    } catch (error) {
      console.error('Error in protected route:', error);
      return res.status(401).json({ message: 'Access denied to User' });
    }
  };
  

export {Register,Login,protectedRoute,Logout};