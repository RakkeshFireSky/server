import mongoose from "mongoose";
import bcrypt from "bcrypt";

interface UserProps {
    username: string;
    email: string;
    password: string;
    tokens: string;
}

const userSchema = new mongoose.Schema<UserProps>(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    }, { timestamps: true }
)

export const User = mongoose.model<UserProps>("User", userSchema);