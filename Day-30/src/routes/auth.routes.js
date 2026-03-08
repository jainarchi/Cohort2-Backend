import { Router } from "express";
import authControllers from "../controllers/auth.controller.js"
import {validateLogin, validateRegister} from '../valitdation/auth.validator.js'
const authRouter = Router();


/**
 * @route /api/auth/register
 * @description First validate the user info format before performing heavy operations or interacting with the database through the controller.
 */


authRouter.post( "/register", validateRegister , authControllers.registerUser )



authRouter.post('/login' , validateLogin , authControllers.loginUser )




export default authRouter;
