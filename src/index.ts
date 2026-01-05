import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import text_Summarize from '../router/api/text_summarize'
import auth from '../router/api/auth'
import { connectDB } from '../utils/db'
import cookieParser from "cookie-parser";
dotenv.config();

const app = express()

app.use(cors({ origin: "*", credentials: true}))
app.use(express.json())
app.use(cookieParser())

connectDB()

app.use('/api/text', text_Summarize)
app.use('/api', auth)

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})