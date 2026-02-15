import express from 'express';
import dotenv from "dotenv";
dotenv.config();
import cartRouter from './routes/cartRouter.js';
import cartRouter from './routes/cartRouter.js';
import mongoose from 'mongoose';
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

connectDB().then(()=>{
  app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
})

