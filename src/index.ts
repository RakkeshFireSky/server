import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import text_Summarize from '../router/api/text_summarize.ts'
import auth from '../router/api/auth.ts'
import { connectDB } from '../utils/db.ts'
import cookieParser from "cookie-parser";
dotenv.config();

const app = express()
await connectDB()
app.use((req, res, next) => {
  // 1. Get the requesting origin
  const origin: any = req.headers.origin;
  
  // 2. List ALL your allowed origins (production + development)
  const allowedOrigins = [
    'https://front-livid-nine.vercel.app',
    'http://localhost:3000',      
    'http://127.0.0.1:3000',          
  ];
  
  // 3. Set specific origin (NOT wildcard *)
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  
  // 4. ALWAYS allow credentials
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // 5. Allow common methods
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  
  // 6. Allow common headers
  res.header('Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-API-Key'
  );
  
  // 7. Handle preflight requests IMMEDIATELY
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Max-Age', '86400'); // 24 hours cache
    return res.status(200).end();
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