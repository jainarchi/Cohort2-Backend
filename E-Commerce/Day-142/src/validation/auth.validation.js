import { validationResult , body } from "express-validator";

const validateRequest = (req , res , next) =>{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            success : false , 
            errors : errors.array()
        })
    }

    next()
}


export const registerUserValidation = [
    body('fullname')
     .trim()
     .isLength({min : 3 , max : 50})
    .withMessage('Fullname must be between 3 and 50 characters'),

    body('email')
    .trim().isEmail()
    .withMessage('Email is not valid'),

    body('password')
    .trim().isLength({min : 6})
    .withMessage('Password must be at least 6 characters long'),

   body("contact")
    .notEmpty().withMessage("Contact is required")
    .matches(/^[6-9]\d{9}$/).withMessage("Enter valid 10 digit Indian mobile number"),


    validateRequest


]