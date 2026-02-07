const express = require('express')
const userModel  = require('../models/users.model')
const authRouter = express.Router()
const JWT = require('jsonwebtoken')


/* 
    POST  /api/auth/register
    controller - func run on req 
*/

authRouter.post('/register' , async (req , res) =>{
    const {username , email , password} = req.body

   const userExists =  await userModel.findOne({email})

   if(userExists){
    return res.status(409)
    .json({
        message : 'User already exists'
    })
   }

   const user = await userModel.create({
    username,
    email,
    password
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


module.exports = authRouter