import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import {
  validateUserRegistration,
  validateUserLogin,
  validateChatCreation,
  validateMessageCreation,
  
} from "../validators/validators.js";


const router = Router()

/**
 * @route /api/auth/register 
 * @description user registration endpoint. It accepts user details (username, email, password) and creates a new user account. After successful registration, it sends a verification email to the user's email address with a link to verify their account.
 */

router.post('/register' , validateUserRegistration , authController.registerUser )

/**
 * @route /api/auth/verify-email
 * @description user verify email by clicking the link sent to their email address during registration. The link contains a token that is used to verify the user's email and activate their account.
 * @access public
 * @query { token }
 */

router.get('/verify-email' , authController.verifyEmail)

export default router