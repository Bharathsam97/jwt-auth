import { Router } from "express";
const userRouter = Router();
import { Register,Login,protectedRoute,Logout } from "../controllers/usercontroller.js";
import { authenticateToken } from "../../utils/utlis.js";

userRouter.post('/register',Register);
userRouter.post('/login',Login);
userRouter.get('/protected',authenticateToken,protectedRoute);
// userRouter.post('/logout',authenticateToken,Logout);
userRouter.post('/logout',Logout);

export {userRouter};