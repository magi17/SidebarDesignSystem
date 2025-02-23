import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import geminiRouter from "./routes/gemini";

export async function registerRoutes(app: Express): Promise<Server> {
  // prefix all routes with /api
  app.use("/api/gemini", geminiRouter);

  const httpServer = createServer(app);
  return httpServer;
}