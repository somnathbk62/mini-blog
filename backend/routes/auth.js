import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Register/Login route (combined since we're not using password hashing for simplicity)
router.post("/login", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validate email format
    if (!/^[^\s@]+@gmail\.com$/.test(email)) {
      return res.status(400).json({
        message: "Only Gmail addresses are allowed",
      });
    }

    // Check if user exists
    let user = await User.findOne({ email });

    if (user) {
      // User exists, check password
      if (user.password === password) {
        res.json({
          message: "Login successful",
          user: {
            id: user._id,
            email: user.email,
            name: user.name,
          },
        });
      } else {
        res.status(401).json({ message: "Invalid password" });
      }
    } else {
      // User doesn't exist, create new user
      if (!name) {
        return res.status(400).json({
          message: "Name is required for new users",
        });
      }

      if (password.length < 6) {
        return res.status(400).json({
          message: "Password must be at least 6 characters long",
        });
      }

      user = new User({
        email,
        password,
        name,
      });

      await user.save();

      res.status(201).json({
        message: "Account created and logged in successfully",
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
      });
    }
  } catch (error) {
    console.error("Auth error:", error);
    if (error.code === 11000) {
      res.status(400).json({ message: "Email already exists" });
    } else {
      res.status(500).json({ message: "Server error" });
    }
  }
});

// Get user profile
router.get("/profile/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
