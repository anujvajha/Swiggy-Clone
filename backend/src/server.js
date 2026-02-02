import express from 'express';
import dotenv from "dotenv";
dotenv.config();
import mongoose from 'mongoose';
const app = express();


app.use(express.json());
const PORT = process.env.PORT || 5001;

mongoose.connect(process.env.MONGO_URI)
  .then(() => 
  {
    app.listen(PORT, () => 
    {
      console.log(`Server Listening to port ${PORT}`);
    })
  })
  .catch((err) =>
  {
    console.log("Connection to db failed", err);
    process.exit(1);
  })


