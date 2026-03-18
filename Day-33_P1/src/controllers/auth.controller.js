import userModel from "../models/user.model.js";
import { sendEmail } from "../service/mail.service.js";
import jwt from "jsonwebtoken";




async function registerUser(req, res) {
  const { username, email, password } = req.body;

  const userExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (userExist) {
    return res.status(409).json({
      message: "User with this email or username already exists",
      success: false,
      err: "user already exists",
    });
  }

  const user = await userModel.create({
    username,
    email,
    password,
  });

  const token = jwt.sign(
    { email: email },
     process.env.JWT_SECRET, 
     { expiresIn: "1h",}
   )

  await sendEmail({
    to: email,
    subject: "Welcome to Perplexity",
    html: `
        <p>Hi ${username},</p>
        <p>Thanks for registering at <strong>Perplexity</strong>. We're excited to have you on board!</p>
        <p>Please verify your email address by clicking the link below:</p>
        <a href="http://localhost:3000/api/auth/verify-email?token=${token}">Verify Email</a>
        <p>If you did not create an account, please ignore this email.</p>
        <p>Best regards,</p>
        <p>The Perplexity Team</p>
        `,
  });

  res.status(201).json({
    message:
      "user register successfully. please verify your account to access features.",
    success: true,
    user: {
      id: user._id,
      email: email,
      username: username,
    },
  });
}


/**
 * @route api/auth/verify-email
 * @desc verify token then update user verfied to true
 * show button go to login
 */

async function verifyEmail(req, res) {
  const { token } = req.query;
  if (!token) {
    return res.status(400).json({
      message: "token not found",
      success: false,
    });
  }

  let decoded = null;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    res.status(400).json({
      message: "Invalid token.",
      success: false,
      err: err.message,
    });
  }


  const user = await userModel.findOne({ email: decoded.email });
  user.verified = true;
  user.save();

  // show page for email successfull verified

  const html = `
  <div style="text-align: center; padding: 50px; font-family: Arial, sans-serif;">
    <h1 style="color: #4CAF50;">Email Verified Successfully!</h1>
    <p style="font-size: 18px;">
    Your email has been verified. You can now log in to your account.</p>
    <a href="http://localhost:3000/login" 
    style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Go to Login</a>
  </div>
  `

  res.send(html);
}



/**
 * @route /api/auth/login
 * @desc user logged in our account
 * @access public
 * @body { email , password }
 */

async function login(req , res){
  const {email , password} = req.body

  const user = await userModel.findOne({email}).select('+password')

  if(! user){
    return res.status(400)
    .json({
      message : "Invalid credential",
      success: false,
      err: "User not found"
    })
  }

  const isValidPassword = await user.comparePassword(password)

  
  if(! isValidPassword){
    return res.status(400)
    .json({
      message : 'Invalid credential',
      success : false,
      err: "User not found"
    })
  }


   if( !user.verified){
    return res.status(400)
    .json({
       message: "Please verify your email before logging in",
       success : false,
       err : 'Email not verified'
    })
   }



  const token = jwt.sign(
    {id : user._id} , 
    process.env.JWT_SECRET,
    {expiresIn : '7d'}
  )


  res.cookie('token' , token , {httpOnly : true})
  user.password = undefined

  res.status(200)
  .json({
    message : 'Logged In successfully',
    success : true ,
    user
  })

}




/**
 * @route /api/auth/get-me
 * @desc get current loggedIn user detail
 * @access private
 */


async function getMe(req ,res) {
  const userId = req.user.id

  const user = await userModel.findById(userId)

  res.status(200)
  .json({
    message : "details fetched successfully",
    user
  })
  
}





export default {
  registerUser,
  verifyEmail,
  login,
  getMe
};
