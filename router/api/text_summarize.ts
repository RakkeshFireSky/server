import axios from "axios";
import { Router, Response, Request, response } from "express";

const router = Router()


router.post("/text_summary", async (req: Request, res: Response) => {
    try {
        const { text } = req.body

        if (!text) {
            return res.status(400).json({ message: "Text is Req" })
        }

        const response = await axios.post(
            "https://router.huggingface.co/hf-inference/models/facebook/bart-large-cnn",
            { inputs: text },
            { headers: { Authorization: `Bearer ${process.env.HUG_FACE_TOKEN}`, "Content-Type": "application/json" } }
        );

        return res.status(200).json({ message: "Success", Summary: response.data[0].summary_text })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
})
export default router