import { body, validationResult } from "express-validator";

// Middleware to handle validation errors
export const handleValidationErrors = (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
  
};

// User validation rules
export const validateUserRegistration = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("Username must be between 3 and 50 characters"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

    handleValidationErrors
];

export const validateUserLogin = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("Password is required"),

    handleValidationErrors
];

// Chat validation rules
export const validateChatCreation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Chat title is required")
    .isLength({ max: 200 })
    .withMessage("Chat title must not exceed 200 characters"),

    handleValidationErrors
];

// Message validation rules
export const validateMessageCreation = [
  body("chatId")
    .notEmpty()
    .withMessage("Chat ID is required")
    .isMongoId()
    .withMessage("Invalid chat ID"),
  body("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn(["user", "ai"])
    .withMessage("Role must be either 'user' or 'ai'"),
  body("content")
    .trim()
    .notEmpty()
    .withMessage("Message content is required")
    .isLength({ min: 1 })
    .withMessage("Message cannot be empty"),

    handleValidationErrors
];
