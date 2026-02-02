import express from 'express';
import {validationResult} from 'express-validator';
import { loginValidator, registerValidator } from '../validators/authValidator.js';
import validate from '../middlewares/validate.js';
import { login, register } from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post("/register", registerValidator, validate, register);
authRouter.post("/login",loginValidator,validate,login);

export {authRouter};