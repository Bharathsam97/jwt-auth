import express  from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";
import {connectDB} from "./database/dataBaseConnection.js";
import { config } from 'dotenv';
import { userRouter } from "./src/routes/userrouter.js";
import cors from 'cors';
import {refreshAccessToken} from './utils/utlis.js'

const app=express();
app.use(bodyParser.urlencoded({extended:true }));
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // Adjust the origin as needed
  }));

config();
const port =process.env.PORT || 3002;

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
    });

//connect to DB
connectDB();

console.log(process.env.DB_CONNECTION);

//user routes

app.use('/user',userRouter);

app.get('/',(req,res)=>{
    res.send("Successfully server is running...")
})

app.post('/refresh-token', (req, res) => {
    refreshAccessToken(req, res);
  });

app.listen(port,()=>{
    console.log(`server listening to port:${port}`);
});

