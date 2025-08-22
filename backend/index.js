import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/Mini-Blog")
  .then(() => console.log("MongoDB connected to Mini-Blog database"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Use Routes
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);

// Basic route (optional, but good for testing)
app.get("/", (req, res) => {
  res.send("Mini Blog API is running");
});

// Lightweight keep-alive endpoint
app.get("/keep-alive", (req, res) => {
  res.status(200).send("OK");
});

// Self-ping every ~14 minutes to keep free instances from idling
// Works on Render by using the external URL when available
const KEEP_ALIVE_INTERVAL_MS = 14 * 60 * 1000;
const BASE_URL =
  process.env.RENDER_EXTERNAL_URL || // Provided by Render
  process.env.BASE_URL || // Fallback you can set manually in env
  `http://localhost:${PORT}`; // Local dev

if (process.env.KEEP_ALIVE !== "false") {
  setInterval(async () => {
    try {
      await fetch(`${BASE_URL}/keep-alive`, { method: "GET" });
      console.log(`[keep-alive] Pinged ${BASE_URL}/keep-alive`);
    } catch (err) {
      console.error("[keep-alive] Ping failed:", err?.message || err);
    }
  }, KEEP_ALIVE_INTERVAL_MS);
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
