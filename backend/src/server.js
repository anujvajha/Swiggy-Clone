import express from 'express';
import { connectDB } from './config/db.js';
import dotenv from "dotenv"
import cartRouter from './routes/cartRouter.js'

dotenv.config()
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use("/cart", cartRouter)

connectDB().then(()=>{
  app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
})

