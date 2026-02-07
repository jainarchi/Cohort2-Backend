const express = require('express')
const userModel = require('../models/users.model')
const JWT = require('jsonwebtoken')

const authRoute = express.Router()


authRoute.post('/register' ,async (req , res) =>{
    const {username , email , password} = req.body;

    const exists = await userModel.findOne({email}) 

    if(exists){
       return res.status(409)
        .json({
           message : 'User exists already' 
        })
    }

    const user = await userModel.create({
        username ,
        email,
        password
    })

    const token = JWT.sign({
        id : user._id,
        email : user.email

    },

     process.env.JWT_SECRET
    )
      
    res.cookie("jwt_token" , token)



    res.status(201)
    .json({
        message: 'user created successfully',
        user,
        token
    })
})


authRoute.post('/test' , async(req , res) =>{
    console.log(req.cookies)          // give all cookies

    res.status(200)
    .json({
        cookies : req.cookies
    })
})


module.exports = authRoute