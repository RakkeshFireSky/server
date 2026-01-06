
import {Response, Request} from "express";
import { Router } from "express";

const router = Router();

router.post('/logout', (req: Request, res: Response) => {
    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: '/',
    });
    return res.status(200).json({message: "Logged out successfully"})
})

export default router;