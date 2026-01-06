import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB_URL = process.env.DB_URL as string;

if (!DB_URL) {
  throw new Error("Please provide DB_URL in the environment variables");
}
 

export const connectDB = async (): Promise<void> => {
  mongoose.set('bufferCommands', false);

  if (mongoose.connection.readyState === 1) return;
  try {
    await mongoose.connect(DB_URL, {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("MongoDB connection error", error);
    process.exit(1);
  }
};
