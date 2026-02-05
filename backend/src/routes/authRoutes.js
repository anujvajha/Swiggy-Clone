import express from 'express';

import { loginValidator, registerValidator } from '../validators/authValidator.js';
import validate from '../middlewares/validate.js';
import { login, logout, refresh, register } from '../controllers/authController.js';


const authRouter = express.Router();

authRouter.post("/register", registerValidator, validate, register);
authRouter.post("/login",loginValidator,validate,login);
authRouter.post("/refresh-token", refresh);
authRouter.post("/logout", logout)
// authRouter.post("/logout", (req,res)=>{
//     console.log("logout hit");
//     res.status(201).json({message:"success"});
// })

export {authRouter};