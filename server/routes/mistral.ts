import { Router } from "express";
import { Mistral } from "@mistralai/mistralai";

const router = Router();

const apiKey = "cixQtTuj5ql7j0mf25m79mk75n6jdPoU";
if (!apiKey) {
  throw new Error("Missing MISTRAL_API_KEY");
}

const client = new Mistral({ apiKey });

router.get("/", async (req, res) => {
  const { message } = req.query;

  if (!message || typeof message !== "string") {
    return res.status(400).json({
      error: "Message is required. Example: /api/mistral?message=What%20is%20the%20best%20French%20cheese?",
    });
  }

  try {
    const chatResponse = await client.chat.complete({
      model: "mistral-large-latest",
      messages: [{ role: "user", content: message }],
    });

    const botResponse = chatResponse.choices[0]?.message.content || "No response received";
    res.status(200).json({ response: botResponse });
  } catch (error: any) {
    console.error("Error:", error);
    res.status(500).json({ 
      error: "An error occurred while processing your request",
      details: error.message
    });
  }
});

export default router;
