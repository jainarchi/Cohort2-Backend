const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const blacklistModel = require('../models/blacklist.model')





async function register(req, res) {
  const { email, username, password } = req.body;

  const userAlreadyExists = await userModel.findOne({
    $or : [
        { email }, 
        { username }
    ]
  });

  if (userAlreadyExists) {
    return res.status(409).json({
      message: "user already exists",
    })
  }

//   const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    email,
    username,
    password,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.cookie("token", token);



  res.status(201).json({
    message: "User register successfully",
    user,
  });
}




async function login(req, res) {
    
  const { email, password, username } = req.body;

  const user = await userModel.findOne({
    $or: [
        { email }, 
        { username }
    ]
  }).select('+password')

  if (!user) {
    return res.status(400)
    .json({
      message: "Invalid Credentials",
    });
  }

 const isMatch = await user.comparePassword(password);

  if (! isMatch) {
    return res.status(400).json({
      message: "Invalid Credentials",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.cookie("token", token);


  res.status(200).json({
    message: "User logged in successfully",
    user,
  });
}





async function getMe(req , res) {
   const user = await userModel.findById(req.user.id)

   res.status(200)
   .json({
    message : 'user data fetch successfully',
    user
   })
}



async function logout(req , res) {
  const token = req.cookies.token

  await blacklistModel.create({
    token
  })

  res.clearCookie(token)

  res.status(200)
  .json({
    message : "Logout successfully"
  })
}










module.exports = {
  register,
  login,
  getMe,
  logout
};







// why we use 400 "Invalid Credentials" instead of "User not found"  in Login

//  To prevent hackers from knowing which users exist
//  To prevent user enumeration
//  Because it's industry best practice




// What Is User Enumeration?

// User Enumeration is a security vulnerability where an attacker can figure out whether a specific user exists in the system.

// It happens when your application gives different responses for:

//  “User not found”
//  “Wrong password”

// That difference leaks information.