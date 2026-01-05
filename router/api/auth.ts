import { User } from "../../models/User";
import {Response, Request} from "express";
import bcrypt from "bcrypt";
import { Router } from "express";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../../middleware/authMiddleware";



const router = Router();

router.post('/sign-up', async(req: Request, res: Response) => {
    try {
        const {username, email, password} = req.body;
        if(!username || !email || !password) {
            return res.status(400).json({message: "Please provide all required fields"});
        }
        const existingUser = await User.findOneAndDelete({email})

        if(existingUser) {
            return res.status(400).json({message: "User already exists"});
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email, 
            password: hashPassword,
        })
        await newUser.save();

        return res.status(201).json({message: "User created successfully", newUser});
    } catch (error: any) {
        return res.status(500).json({message: "Internal server error", error: error.message});
    }
})


router.post("/sign-in", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Password Invalid" });
    }

    const tokenData = {
        id: existingUser._id,
        Username: existingUser.username,
        email: existingUser.email,
    }
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY as string, {expiresIn: '1d'})

    console.log("Generated Token:", token);

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000
    })
    
    return res.status(201).json({message: "Sign-in successful", token, tokenData})
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
});


router.get("/me", authMiddleware, async (req: Request, res: Response) => {
  const user = await User.findById(req.user!.id).select("-password")
  return res.status(200).json({message: "User found", user})
})

export default router;