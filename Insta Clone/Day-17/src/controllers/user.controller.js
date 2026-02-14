const userModel = require('../models/user.model')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')




async function registerUser(req , res) {
     const {email , password , username , bio , profileImage} = req.body

     const userExists = await userModel.findOne({
        $or : [
            {username},
            {email}
        ]
     })

     if(userExists){
        return res.status(409)
        .json({
            message : (email === user.email ? 'email' : 'username') + 'already exists'
        })
     }

     const hash = await bcryptjs.hash(password , 10)

     const user = await userModel.create({
        username,
        email,
        password: hash,
        bio,
        profileImage
     })

     const token = jwt.sign({id : user._id} , process.env.JWT_SECRET , {expiresIn : '1d'});

     res.cookie('token' , token , {httpOnly : true , samesite : true})

     res.status(201)
     .json({
        message : 'new user registered successfully ',
        username : user.username,
        bio : user.bio,
        profileImage : user.profileImage
     })

}

module.exports = {
    registerUser
}