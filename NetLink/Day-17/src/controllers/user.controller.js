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
            message : (email === userExists.email ? 'email' : 'username') + ' already exists'
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





async function loginUser(req , res){
    const {email , username , password} = req.body

    const user = await userModel.findOne({
        $or : [
            {username},
            {email}
        ]
    })

    if(!user){
        return res.status(404)
        .json({
            message : 'user not found, Please sign up'
        })
    }

    const isValidPassword = await bcryptjs.compare(password , user.password)

    if(! isValidPassword){
        return res.status(401)
        .json({
            message : 'Invalid password'
        })
    }


    const token = jwt.sign({id : user._id} , process.env.JWT_SECRET , {expiresIn : '1d'})
    res.cookie('token' , token , {httpOnly : true , samesite : true})


    res.status(200)
    .json({
        message : 'user logged In successfully'
    })

}




module.exports = {
    registerUser,
    loginUser
}