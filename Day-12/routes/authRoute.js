const express = require('express')
const userModel  = require('../models/users.model')
const authRouter = express.Router()
const JWT = require('jsonwebtoken')
const crypto = require('crypto')                  // nodejs build-in core module




authRouter.post('/register' , async (req , res) =>{
    const {username , email , password} = req.body

   const userExists =  await userModel.findOne({email})

   if(userExists){
    return res.status(409)
    .json({
        message : 'User already exists'
    })
   }

   const hash = crypto.createHash('md5').update(password).digest('hex')

   const user = await userModel.create({
    username,
    email,
    password : hash
   })

   const token = JWT.sign({
    id: user._id
   }, process.env.JWT_SECRET)

   
   res.cookie('jwt_token' , token)


   res.status(201)
   .json({
    message: 'User created successfully',
    user,
    token
   })
    

    
})


authRouter.post('/login' , async (req , res) =>{
   const {email , password} = req.body

   const user = await userModel.findOne({email})

   if( !user ){
    return res.status(404)
    .json({
        message : "User not found"
    })
   }

   const isPasswordMatch = user.password === crypto.createHash('md5').update(password).digest('hex')
   
   if(! isPasswordMatch ){
    return res.status(401)
    .json({
        message: "Invalid Password"
    })
   }

   
   const token = JWT.sign({
    id : user._id
   }, process.env.JWT_SECRET)


   res.cookie('jwt_token' , token)

   res.status(200)
   .json({
      message: "logged in successfully"
   })
})



module.exports = authRouter