const express = require('express')
const userModel = require('../models/users.model')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const authRouter = express.Router();





authRouter.post('/register' , async (req , res) =>{
   const {username , email , password} = req.body
      
   const user = await userModel.findOne({email})

   if(user){
     return res.status(409)
    .json({
        message : 'User already exists'
    })
   }

   const hash = crypto.createHash('md5').update(password).digest('hex')

   const newUser = await userModel.create({
      username ,
      email,
      password: hash
   })


   const token = jwt.sign({
     id : newUser._id
   }, process.env.JWT_SECRET)


   res.cookie('jwt_token' , token , {httpOnly: true , samesite : 'strict'})

   res.status(201)
   .json({
    message : 'new user registed',
   })
})




authRouter.post('/login' , async (req , res) =>{
    const {email , password} = req.body

    const user = await userModel.findOne({email})
    
    if(! user){
        return res.status(404)
        .json({
            message : 'User not found'
        })
    }

    const passwordMatched = user.password === crypto.createHash('md5').update(password).digest('hex')

    if(! passwordMatched){
        return res.status(401)
        .json({
            message : 'Invalid password'
        })
    }


    const token = jwt.sign({
        id : user._id
    }, process.env.JWT_SECRET)


    res.cookie('jwt_token' , token , {httpOnly : true , samesite : 'strict'})    


    res.status(200)
    .json({
        message : 'user logged in successfully',
        user
    })

})




module.exports = authRouter;
