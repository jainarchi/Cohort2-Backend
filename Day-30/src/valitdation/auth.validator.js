import {body , validationResult} from 'express-validator'


const validator = (req , res , next) => {
    const errors = validationResult(req)

    if(errors.isEmpty()){
        return  next()
    }

    res.status(400)
    .json({
        errors : errors.array()
    })
}


// express validator arr format
export const validateRegister = [
    body('username').isString().withMessage("Username must be string"),
    body('email').isEmail().withMessage("Provide a valid email address"),
    body("password").custom((value) => {
      const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

      if (!regex.test(value)) {
        throw new Error(
          "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        );
      }

      return true;
    }),
    validator
]



export const validateLogin = [

  body("password")                    
    .notEmpty()
    .withMessage("Password is required"),

  body().custom((value) => {
    if (!value.username && !value.email) {
      throw new Error("Username or Email is required");
    }
    return true;
  }),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Provide a valid email address"),

  body("username")
    .optional()
    .isString()
    .withMessage("Username must be a string"),

  validator,
];