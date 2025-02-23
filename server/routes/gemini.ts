import { Router } from "express";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = Router();

const apiKeys = [
  "AIzaSyC5n8Fr6Xq722k0jkrRM0emqSQk_4s_C-o",
  "AIzaSyD5CCNspQlYuqIR2t1BggzEFG0jmTThino"
];

const API_KEY = apiKeys[Math.floor(Math.random() * apiKeys.length)];

if (!API_KEY) {
  throw new Error("API_KEY is not set.");
}

router.get("/", async (req, res) => {
  const { ask, imagurl } = req.query;

  if (!ask || typeof ask !== 'string') {
    return res.status(400).json({ error: 'The ask parameter is required.' });
  }

  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    let result;

    if (imagurl && typeof imagurl === 'string') {
      // Fetch the image and include it in the request
      const imageResponse = await axios.get(imagurl, {
        responseType: 'arraybuffer',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
          'Accept': 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
          'Referer': 'https://facebook.com'
        }
      });

      const image = {
        inlineData: {
          data: Buffer.from(imageResponse.data).toString("base64"),
          mimeType: "image/jpeg",
        },
      };

      result = await model.generateContent([ask, image]);
    } else {
      // If imagurl is not provided, only use the text input (ask)
      result = await model.generateContent(ask);
    }

    res.json({
      description: result.response.text(),
    });
  } catch (error: any) {
    console.error("Error:", error.message);
    res.status(500).json({
      error: 'An error occurred while processing the request.',
      details: error.message,
    });
  }
});

export default router;
