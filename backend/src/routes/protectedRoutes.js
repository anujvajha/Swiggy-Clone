import express from "express"
import authMiddleware from "../middlewares/authMiddleware.js"

const protectedRouter = express.Router();

protectedRouter.get("/profile",authMiddleware,(req,res)=>{
    res.json({message: "Protected route accessed", user: req.user,});
});


export {protectedRouter};