import { Router } from "express";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    res.json({
      message: "Hello from the API!",
      timestamp: new Date().toISOString()
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
