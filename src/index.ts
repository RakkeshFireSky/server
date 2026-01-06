import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import text_Summarize from '../router/api/text_summarize'
import auth from '../router/api/auth'
import { connectDB } from '../utils/db'
import cookieParser from "cookie-parser";
import { corsMiddleware } from "../config/cors";
import mongoose from "mongoose";
dotenv.config();

const app = express();
app.use(cors({
  origin: ["http://localhost:3000","https://front-livid-nine.vercel.app","https://front-3vxayrs5r-rakkis-projects-bd4d1705.vercel.app"],
   credentials: true,  // Required for cookies/auth
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(async (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    await connectDB();
  }
  next();
});

app.use(express.json())
app.use(cookieParser())


app.use('/api/text', text_Summarize)
app.use('/api', auth)

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)   
})