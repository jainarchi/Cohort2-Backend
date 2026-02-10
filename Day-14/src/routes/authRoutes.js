const express = require("express");
const userModel = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

// POST  api/auth/register

authRouter.post("/register", async (req, res) => {
  const { email, password, name } = req.body;

  const isUserExists = await userModel.findOne({ email });

  if (isUserExists) {
    return res.status(409).json({
      message: "User already exists",
    });
  }

  const user = await userModel.create({
    name,
    email,
    password: crypto.createHash("sha256").update(password).digest("hex"),
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1hr",
  });

  res.cookie("token", token);

  res.status(201).json({
    message: "user register successfully",
  });
});



// GET  api/auth/get-me
authRouter.get("/get-me", async (req, res) => {
  const token = req.cookies.token;

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await userModel.findById(decoded.id);


  res.status(200).json({
    name: user.name,
    id: user.id,
  });
});


authRouter.post('/login' , async (req ,res) =>{
    const {email , password } = req.body

    const user = await userModel.findOne({email})
    
    if(! user){
        return res.status(404)
        .json({
            message : "User not found"
        })
    }

    const hash = crypto.createHash('sha256').update(password).digest('hex')

    if(user.password !== hash){
        return res.status(401)
        .json({
            message : "Invalid password"
        })
    }

    const token = jwt.sign({id : user._id} , process.env.JWT_SECRET , {expiresIn : '1hr'})
    res.cookie('token' , token)

    res.status(200)
    .json({
        message : 'user logged in successfully'
    })
})




module.exports = authRouter;
