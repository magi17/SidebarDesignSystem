import { Router } from "express";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = Router();

// Use environment variable with fallback
const apiKeys = [
  "AIzaSyC5n8Fr6Xq722k0jkrRM0emqSQk_4s_C-o",
  "AIzaSyD5CCNspQlYuqIR2t1BggzEFG0jmTThino"
];

const API_KEY = process.env.GEMINI_API_KEY || apiKeys[Math.floor(Math.random() * apiKeys.length)];

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
    // Use a more stable model
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    let result;

    if (imagurl && typeof imagurl === 'string') {
      try {
        // Add timeout and validation for image URL
        const imageResponse = await axios.get(imagurl, {
          responseType: 'arraybuffer',
          timeout: 5000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
            'Accept': 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
          }
        });

        // Validate image response
        const contentType = imageResponse.headers['content-type'];
        if (!contentType || !contentType.startsWith('image/')) {
          throw new Error('Invalid image format');
        }

        const image = {
          inlineData: {
            data: Buffer.from(imageResponse.data).toString("base64"),
            mimeType: contentType,
          },
        };

        result = await model.generateContent([ask, image]);
      } catch (imageError: any) {
        console.error("Image processing error:", imageError);
        return res.status(400).json({
          error: 'Failed to process image',
          details: imageError.message
        });
      }
    } else {
      // Use text-only model for non-image queries
      const textModel = genAI.getGenerativeModel({ model: "gemini-pro" });
      result = await textModel.generateContent(ask);
    }

    // Validate response
    if (!result?.response) {
      throw new Error('No response from Gemini API');
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