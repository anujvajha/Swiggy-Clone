import express from 'express';
import { connectDB } from './config/db.js';
import dotenv from "dotenv"
dotenv.config();
import cartRouter from './routes/cartRouter.js'
import { authRouter } from './routes/authRoutes.js';
import { protectedRouter } from './routes/protectedRoutes.js';
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:3000", // frontend URL
    credentials: true,
  })
);
app.use(express.json())
app.use(cookieParser());
app.use("/cart", cartRouter)
app.use("/auth",authRouter)
app.use("/user",protectedRouter)

connectDB().then(()=>{
  app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
})

