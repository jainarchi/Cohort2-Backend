const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");




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

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    email,
    username,
    password: hash,
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

  const isCorrectPassword = await bcrypt.compare(password, user.password);


  if (!isCorrectPassword) {
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





module.exports = {
  register,
  login,
};


// why we use "Invalid Credentials" instead of "User not found"

//  To prevent hackers from knowing which users exist
//  To prevent user enumeration
//  Because it's industry best practice




// What Is User Enumeration?

// User Enumeration is a security vulnerability where an attacker can figure out whether a specific user exists in the system.

// It happens when your application gives different responses for:

//  “User not found”
//  “Wrong password”

// That difference leaks information.