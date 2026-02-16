const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')


async function registerUser(req , res) {
    const {email , username , password , bio , profileImage} = req.body

    const userExists = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if(userExists){
        return res.status(409)
        .json({
            message: 'user already exists with this ' + (username == userExists.username ? 'username' : 'email')
        })
    }
    
    const hash = await bcryptjs.hash(password , 10)

    await userModel.create({
        email,
        username,
        password : hash,
        bio,
        profileImage
    })


    const token = jwt.sign({id: user._id} , process.env.JWT_SECRET , {expiresIn: '1d'})
    res.cookie('token' , token , {httpOnly: true , samesite: true})

    res.status(201)
    .json({
        message : 'user register successfully'
    })

}


async function loginUser(req , res) {
    const {email , username , password} = req.body

    const user = await userModel.findOne({
        $or: [
            {username},
            {email}
        ]
    })

    if(!user){
        return res.status(404)
        .json({
            message : 'user not found'
        })
    }

    const validPassword = bcryptjs.compare(password , user.password)

    if(!validPassword){
        return res.status(401)
        .json({
            message: 'Invalid password'
        })
    }


    const token = jwt.sign({id: user._id} , process.env.JWT_SECRET , {expiresIn: '1d'})
    res.cookie('token' , token , {httpOnly: true , samesite : true})
    
    res.status(200)
    .json({
        message : 'User logged In successfully'
    })
}





module.exports ={
    registerUser,
    loginUser,
    
}

