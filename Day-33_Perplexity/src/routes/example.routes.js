import express from "express";
import {
  validateUserRegistration,
  validateUserLogin,
  validateChatCreation,
  validateMessageCreation,
  
} from "../validators/validators.js";

const router = express.Router();

// Example: User Registration Route
router.post(
  "/register",
  validateUserRegistration,
  
  (req, res) => {
    // Your registration controller logic here
    // const { username, email, password } = req.body;
    res.json({ message: "User registered successfully" });
  }
);

// Example: User Login Route
router.post(
  "/login",
  validateUserLogin,
  
  (req, res) => {
    // Your login controller logic here
    // const { email, password } = req.body;
    res.json({ message: "User logged in successfully" });
  }
);

// Example: Create Chat Route
router.post(
  "/chat",
  validateChatCreation,
  
  (req, res) => {
    // Your chat creation controller logic here
    // const { title } = req.body;
    res.json({ message: "Chat created successfully" });
  }
);

// Example: Create Message Route
router.post(
  "/message",
  validateMessageCreation,
  
  (req, res) => {
    // Your message creation controller logic here
    // const { chatId, role, content } = req.body;
    res.json({ message: "Message created successfully" });
  }
);

export default router;
