import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../services/mail.service.js";



/**
 * send verification email on user's email address
 * call from register and resend email controller
 */

async function sendVerificationEmail(username , email) {

  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  })

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
    
}

/**
 * @desc Send password reset link to the user's email.
 */

async function sendResetPasswordEmail(username, email) {

  const token = jwt.sign(
    { email },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );

  await sendEmail({
    to: email,
    subject: "Reset Your Password",
    html: `
      <p>Hi ${username},</p>
      <p>You requested to reset your password.</p>
      <p>Click the link below to set a new password:</p>
      
      <a href="http://localhost:5173/reset-password?token=${token}">
        Reset Password
      </a>

      <p>This link will expire in 15 minutes.</p>
      <p>If you did not request this, please ignore this email.</p>

      <p>Perplexity Team</p>
    `
  });
}


/**
 * @route POST api/auth/register
 * @desc new user create in DB and call sendVerificationEmail
 */

async function register(req, res) {
  const { username, email, password } = req.body;

  const userAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (userAlreadyExists) {
    return res.status(409).json({
      message: "User already exists",
      success: false,
      err: "user already exists",
    });
  }

  const user = await userModel.create({
    username,
    email,
    password,
  });

  // link send for verifitcation
  await sendVerificationEmail(username , email)
 

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
 * @route POST api/auth/resend-verification
 * @desc resend verification link on email 
 */

async function resendVerificationEmail(req , res) {
   const {username , email} =  req.body

   await sendVerificationEmail(username , email)


   res.status(200)
   .json({
      message : "verification email resend successfully",
      success : true
   })

}




/**
 * @route GET  api/auth/verify-email
 * @desc verify token then update user verfied status to true
 * show button go to login
 * @access public
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
   return res.status(400).json({
      message: "Invalid token",
      success: false,
      err: err.message,
    });
  }

  const user = await userModel.findOne({
    email: decoded.email,
  })

  if (!user) {
  return res.status(404).json({
    message: "User not found",
    success: false,
  });
}


  user.verified = true;
  await user.save();

  // show page for email successfully verified

  const html = `
  <div style="text-align: center; padding: 50px; font-family: Arial, sans-serif;">
    <h1 style="color: #4CAF50;">Email Verified Successfully!</h1>
    <p style="font-size: 18px;">
    Your email has been verified. You can now log in to your account.</p>
    <a href="http://localhost:3000/login" 
    style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Go to Login</a>
  </div>
  `;

  res.send(html);
}



/**
 * @route /api/auth/login
 * @desc user logged in our account
 * @access public
 * @body { email , password }
 */


async function login(req , res) {
    const {email , password} = req.body
    const user = await userModel.findOne({ email }).select('+password')

    if(!user){
      return res.status(400)
      .json({
        message : 'Invalid Credential',
        success : false,
        err : "User not found"
      })
    }

    const isValidPassword = await user.comparePassword(password)

    if( !isValidPassword ){
      return res.status(400)
      .json({
          message : "Invalid Credential",
          success : false,
          err: "User not found"
      })
    }


    if( ! user.verified){
      return res.status(400)
      .json({
       message: "Please verify your email before logging.",
       success : false,
       err : 'Email not verified'
      })
    }


    const token = jwt.sign(
      {id : user.id},
      process.env.JWT_SECRET,
      {expireIn: '7d'}
    )


    res.cookie('token' , token)
    user.password = undefined

   res.status(200)
   .json({
    message : 'Logged In Successfully',
    success: true ,
    user
   })

}




/**
 * @route POST api/auth/forget-password
 * @desc send email to reset password when user forget password
 * @access public
 */



async function forgetPassword(req , res) {
    const {email} = req.body

    const user = await userModel.findOne({email})

    if(!user){
      res.status(400)
      .json({
        message : "Invalid Credential",
        success : false,
        err : "Invalid credential"
      })
    }

  //  sending email to reset password if user is registed
   await sendResetPasswordEmail(user.username , user.email)


   res.status(200)
   .json({
     message : "email is sent to resent your password",
     success : true
   })
}




/**
 * @route POST api/auth/forget-password
 * @desc  user click on link to reset password after enter new password 
 * @access public
 * @query {token}
 */

async function resetPassword(req , res) {
     const {token} = req.query
     const {newPassword} = req.body

     if(! token){
      return res.status(400)
      .json({
        message : "Unauthorized",
        status: false,
        err : "token not provided"
      })
     }


    let decoded = null
     try{
        decoded = jwt.verify(token , process.env.JWT_SECRET)

     }
     catch(err){
      return res.status(400)
      .json({
        message : "Invalid token",
        status: false,
        err : "Invalid token"
      })
     }

     const user = await userModel.findOne({
        email: decoded.email
    })


    user.password = newPassword
    await user.save()     

    res.status(200).json({
      message : "password reset successfully",
      status: true,
    })
    
}





/**
 * @route Get /api/auth/get-me
 * @desc give details of current logged In user
 * @access private
 */


 async function getMe(req , res) {
   const userId = req.user.id

   const user = await userModel.findOneById(userId)


   res.status(200)
   .json({
    message : 'details fetched successfully',
    success : true ,
    user
   })
  
 }









export default {
  register,
  login,
  getMe,
  verifyEmail,
  resendVerificationEmail,
  forgetPassword,
  resetPassword
};
