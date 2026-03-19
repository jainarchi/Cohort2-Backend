# Error Handling & Validation Best Practices Guide

## Overview
This document outlines the error handling and input validation implementation using `express-validator` and custom error handling middleware.

## File Structure

```
src/
├── validators/
│   └── auth.validator.js      # Validation rules for auth routes
├── utils/
│   └── errorHandler.js        # Error handling utilities and middleware
├── controllers/
│   └── auth.controllers.js    # Updated with error throwing
├── routes/
│   └── auth.routes.js         # Updated with validators
├── middleware/
│   └── auth.middleware.js     # Authentication middleware
└── app.js                     # Updated with error handler
```

## Core Components

### 1. **Validators** (`src/validators/auth.validator.js`)

Contains validation rules for all authentication routes:

- **registerValidationRules()** - Validates username, email, password
- **loginValidationRules()** - Validates email, password
- **resendVerificationValidationRules()** - Validates username, email
- **forgetPasswordValidationRules()** - Validates email
- **resetPasswordValidationRules()** - Validates newPassword and token
- **handleValidationErrors()** - Middleware to handle validation errors

#### Validation Rules Details:

```javascript
// Username validation
- Required
- 3-50 characters
- Only alphanumeric and underscore

// Email validation
- Required
- Valid email format
- Normalized (lowercase)

// Password validation
- Required
- Minimum 6 characters
- Must contain letter and number
```

#### Validation Error Response Format:
```json
{
  "message": "Validation failed",
  "success": false,
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email address"
    }
  ]
}
```

### 2. **Error Handler** (`src/utils/errorHandler.js`)

Comprehensive error handling system with multiple utilities:

#### **ApiError Class**
Custom error class for consistent error structure:

```javascript
import { ApiError } from "../utils/errorHandler.js";

throw new ApiError(statusCode, message, errors);
```

#### **Error Handler Middleware**
Global error handler that catches all errors and returns consistent responses:

```javascript
// In app.js
app.use(errorHandler); // Must be last middleware
```

Handles:
- Custom ApiError exceptions
- Mongoose validation errors
- Mongoose duplicate key errors (11000)
- JWT errors (JsonWebTokenError, TokenExpiredError)
- Mongoose cast errors (invalid ObjectId)

#### **AsyncHandler Wrapper**
Wraps async controller functions to catch Promise rejections:

```javascript
import { asyncHandler } from "../utils/errorHandler.js";

router.post('/route', asyncHandler(controllerFunction));
```

#### **Error Helper Functions**
Convenient functions for throwing specific error types:

```javascript
import {
  createValidationError,
  createNotFoundError,
  createUnauthorizedError,
  createForbiddenError,
  createConflictError
} from "../utils/errorHandler.js";

// Usage
throw createNotFoundError("User");        // 404
throw createUnauthorizedError("message"); // 401
throw createConflictError("Username");    // 409
```

### 3. **Controller Updates** (`src/controllers/auth.controllers.js`)

Controllers now throw errors instead of sending responses manually:

```javascript
// BEFORE
if (!user) {
  return res.status(400).json({
    message: "User not found",
    success: false
  });
}

// AFTER
if (!user) {
  throw createNotFoundError("User");
}
```

### 4. **Routes Integration** (`src/routes/auth.routes.js`)

Routes now include validators and asyncHandler:

```javascript
router.post(
  '/register',
  registerValidationRules(),      // 1. Validate input
  handleValidationErrors,          // 2. Check for errors
  asyncHandler(register)           // 3. Execute controller
);
```

## Error Response Examples

### Validation Error
```json
{
  "message": "Validation failed",
  "success": false,
  "errors": [
    {
      "field": "password",
      "message": "Password must contain at least one letter and one number"
    }
  ]
}
```

### User Not Found
```json
{
  "message": "User not found",
  "success": false
}
```

### Duplicate Entry (Database Error)
```json
{
  "message": "Duplicate Entry",
  "success": false,
  "errors": [
    {
      "field": "email",
      "message": "email already exists"
    }
  ]
}
```

### JWT Error
```json
{
  "message": "Invalid token",
  "success": false,
  "errors": [
    {
      "field": "token",
      "message": "Token is invalid or malformed"
    }
  ]
}
```

## Best Practices Implemented

### 1. **Input Validation**
- ✅ Validate all user inputs before processing
- ✅ Normalize data (trim, lowercase email)
- ✅ Clear error messages for failed validations
- ✅ Field-specific error reporting

### 2. **Error Handling**
- ✅ Centralized error handling in middleware
- ✅ Consistent error response format
- ✅ No sensitive information in error messages
- ✅ Proper HTTP status codes (400, 401, 403, 404, 409, 500)

### 3. **Code Quality**
- ✅ Separation of concerns (validators, handlers, controllers)
- ✅ Reusable validation rules
- ✅ DRY principle - helper functions for common errors
- ✅ Automatic error catching with asyncHandler

### 4. **Security**
- ✅ Input sanitization
- ✅ Email normalization
- ✅ Password strength requirements
- ✅ Token validation with expiration

### 5. **Developer Experience**
- ✅ No need for try-catch in controllers
- ✅ Consistent error throwing pattern
- ✅ Easy to add new validation rules
- ✅ Clear error messages for debugging

## How to Add New Validation Rules

### Step 1: Create validation rules in `src/validators/auth.validator.js`:

```javascript
export const newEndpointValidationRules = () => {
  return [
    body("fieldName")
      .trim()
      .notEmpty()
      .withMessage("Field is required")
      .isLength({ min: 5 })
      .withMessage("Field must be at least 5 characters")
  ];
};
```

### Step 2: Use in route:

```javascript
import { 
  newEndpointValidationRules,
  handleValidationErrors 
} from "../validators/auth.validator.js";

router.post(
  '/new-route',
  newEndpointValidationRules(),
  handleValidationErrors,
  asyncHandler(controllerFunction)
);
```

## How to Throw Custom Errors

In your controllers:

```javascript
import { ApiError, createNotFoundError } from "../utils/errorHandler.js";

// Using helper functions
throw createNotFoundError("User");
throw createConflictError("Email");
throw createUnauthorizedError("Invalid credentials");

// Using ApiError directly
throw new ApiError(400, "Custom message", [
  { field: "email", message: "Email is invalid" }
]);
```

## Dependencies

- **express-validator** - Input validation library
- **jsonwebtoken** - JWT token handling
- **mongoose** - Database ORM
- **bcryptjs** - Password hashing

## Development Notes

- Error handler logs full errors in development mode (`NODE_ENV=development`)
- Token validation happens in verifyEmail and resetPassword controllers
- Database validation errors are automatically caught and formatted
- All async operations are wrapped with asyncHandler to prevent unhandled rejections

## Testing the Validation

Test invalid registration:
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"ab","email":"invalid","password":"123"}'
```

Response:
```json
{
  "message": "Validation failed",
  "success": false,
  "errors": [
    {
      "field": "username",
      "message": "Username must be between 3 and 50 characters"
    },
    {
      "field": "email",
      "message": "Please provide a valid email address"
    },
    {
      "field": "password",
      "message": "Password must contain at least one letter and one number"
    }
  ]
}
```
