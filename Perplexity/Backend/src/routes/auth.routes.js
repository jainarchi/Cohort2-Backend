import { Router } from "express";
import authControllers from "../controllers/auth.controllers.js";
import { authUser } from "../middleware/auth.middleware.js";


const router = Router()


/**
 * @route /api/auth/register 
 * @desc user registration endpoint. It accepts user details (username, email, password) and creates a new user account. After successful registration, it sends a verification email to the user's email address with a link to verify their account.
 * @access public
 * @body { username , email , password }
 */
router.post('/register' , authControllers.register)




/**
 * @route POST /api/auth/resend-verification
 * @desc resend a verification email to the user's email address with a link to verify their account.
 * @access public
 * @body {username , email}
 */


router.post('/resend-verification' , authControllers.resendVerificationEmail)



/**
 * @route POST  /api/auth/login
 * @desc user logged account after credential check and verified is true
 * @access public
 * @body { email , password }
 */


router.post('/login' , authControllers.login)




/**
 * @route POST /api/auth/forget-password
 * @desc Send password reset email to user's registered email
 * @access Public
 */
router.post('/forget-password', authControllers.forgetPassword);





/**
 * @route GET /api/auth/get-me
 * @desc give details of current logged In user
 * @access private
 */



router.get('/get-me' , authUser ,  authControllers.getMe)




/**
 * @route POST /api/auth/reset-password
 * @desc Reset user password using token received via email
 * @access Public
 * @query {token}
 */
router.post('/reset-password', authControllers.resetPassword);




/**
 * @route /api/auth/verify-email
 * @desc user verify email by clicking the link sent to their email address during registration. The link contains a token that is used to verify the user's email and activate their account.
 * @access public
 * @query { token }
 */

router.get('/verify-email' , authControllers.verifyEmail)




export default router