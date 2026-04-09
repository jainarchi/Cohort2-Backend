import { Router } from "express";
import { registerUser } from "../controllers/auth.controllers.js";
import {registerUserValidation} from "../validation/auth.validation.js"


const router = Router();

router.post('/register' , registerUserValidation , registerUser)




export default router