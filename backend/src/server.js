import express from 'express';
import { connectDB } from './config/db.js';
import dotenv from "dotenv"
dotenv.config();
import cartRouter from './routes/cartRouter.js'
import { authRouter } from './routes/authRoutes.js';
import { protectedRouter } from './routes/protectedRoutes.js';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use("/cart", cartRouter)
app.use("/auth",authRouter)
app.use("/user",protectedRouter)

connectDB().then(()=>{
  app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
})

