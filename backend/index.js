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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
