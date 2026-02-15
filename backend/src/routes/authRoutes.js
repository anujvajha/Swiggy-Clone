import express from 'express';
import { placeOrder } from '../controllers/orderController';
import { loginValidator, registerValidator } from '../validators/authValidator.js';
import validate from '../middlewares/validate.js';
import { login, logout, refresh, register } from '../controllers/authController.js';


const router = express.Router();

router.post("/register", registerValidator, validate, register);
router.post("/login",loginValidator,validate,login);
router.post('/placeOrder', placeOrder);
router.post("/refresh-token", refresh);
router.post("/logout", logout)
// router.post("/logout", (req,res)=>{
//     console.log("logout hit");
//     res.status(201).json({message:"success"});
// })

export {router};




