const express = require('express')
const userModel = require('../models/users.model')

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

    const user = userModel.create({
        username ,
        email,
        password
    })

    res.status(201)
    .json({
        message: 'user created successfully',
        user,
    })
})


module.exports = authRoute