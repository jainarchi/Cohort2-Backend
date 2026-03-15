import userModel from "../models/user.model.js";
import { sendEmail } from "../../service/mail.service.js";
import jwt from 'jsonwebtoken'




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
    {email: email} , 
    process.env.JWT_SECRET ,
     {expiresIn: '3d'}
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
        `
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








async function verifyEmail(req, res) {
  const {token} = req.query
  if(!token){
    return res.status(400).json({
      message: 'token not found',
      success: false
    })
  }


  let decoded = null;

  try{
    decoded = jwt.verify(token , process.env.JWT_SECRET)
    
} catch(err){
  res.status(400).json({
    message: "Invalid token.",
    success: false,
    err: err.message
  })
}
    const user = await userModel.findOne({email : decoded.email})
    user.verified = true
    user.save()


  // show html page for successfull verify

  const html = `
  <div style="text-align: center; padding: 50px; font-family: Arial, sans-serif;">
    <h1 style="color: #4CAF50;">Email Verified Successfully!</h1>
    <p style="font-size: 18px;">
    Your email has been verified. You can now log in to your account.</p>
    <a href="http://localhost:3000/login" 
    style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Go to Login</a>
  </div>
  `

  res.send(html)
  
}






export default {
  registerUser,
  verifyEmail
};
