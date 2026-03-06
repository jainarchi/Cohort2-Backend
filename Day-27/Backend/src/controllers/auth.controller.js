const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const redis = require('../config/cache')



async function register(req , res ){
    const { username , email , password } = req.body
    
    const userExists = await userModel.findOne({
        $or : [
            {email},
            {username}
        ]
    })

    if(userExists){
        return res.status(409)
        .json({
            message : 'user already exists'
        })
    }

    const user = await userModel.create({
        username ,
        email,
        password
    })
 
    const token = jwt.sign({id : user._id} , process.env.JWT_SECRET , {expiresIn: '1d'})

    res.cookie('token' , token , {
         httpOnly : true,
    })


    res.status(200)
    .json({
        message : 'user register successfully.',
        user
    })

}


async function login(req , res) {

    const {username , email , password} = req.body

    const user = await userModel.findOne({
        $or : [
            {email},
            {username}
        ]
    }).select('+password')


    if( !user){
        return res.status(400)
        .json({
            message : 'Invalid credentials'
        })
    }

    const isCorrectPassword = await user.comparePassword(password)


    if(! isCorrectPassword){
        return res.status(400)
        .json({
            message : 'Invalid credential'
        })
    }

    const token = jwt.sign({id : user._id} , process.env.JWT_SECRET , { expiresIn: '1d' })
    res.cookie('token' , token , {
        httpOnly : true
    })

    res.status(200)
    .json({
        message : "User logged in successfully",
        user
    })
    
}

async function getMe(req , res) {
    const user = await userModel.findById(req.user.id)

    res.status(200)
    .json({
        message : 'user details fetch successfully',
        user
    })
}


async function logout (req , res){

    const token = req.cookies.token


    redis.set( token , Date.now().toString() ,  "EX" , 60*60*24)


    res.clearCookie(token)

    res.status(200)
    .json({
        message : 'user logout successfully'
    })
}


module.exports = {
    register ,
    login,
    getMe,
    logout
}
