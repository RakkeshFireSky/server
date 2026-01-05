import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("req.cookies:", req.cookies);
  console.log("req.headers.authorization:", req.headers.authorization);
  const token =
    req.cookies?.accessToken || req.headers.authorization?.split(" ")[1] || req.headers["accesstoken"]; ;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as any;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
