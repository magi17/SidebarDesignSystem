import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import geminiRouter from "./routes/gemini";
import helloRouter from "./routes/hello";
import mistralRouter from "./routes/mistral";

export async function registerRoutes(app: Express): Promise<Server> {
  // prefix all routes with /api
  app.use("/api/gemini", geminiRouter);
  app.use("/api/hello", helloRouter);
  app.use("/api/mistral", mistralRouter);

  const httpServer = createServer(app);
  return httpServer;
}