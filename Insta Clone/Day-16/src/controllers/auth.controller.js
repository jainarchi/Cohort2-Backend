const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')




async function registerUser(req , res) {
    const{email , password , username , bio , profileImage} = req.body

    const userExists = await userModel.findOne({
        $or :[
            {email},
            {username}
        ]
    })
   
    if(userExists){
        return res.status(409)
        .json({
            messages : (email == userExists.email ? 'email' : 'username') + ' already exists. '  
        })
    }


    const user = await userModel.create({
        email,
        username,
        bio,
        profileImage,
        password : await bcrypt.hash(password , 10)
    })


  
    const token = jwt.sign({id: user._id} , process.env.JWT_SECRET , {expiresIn : '1d'})

    res.cookie('token' , token , {httpOnly : true , samesite : true})

    res.status(201)
    .json({
        message : 'User register successfully'
    })

}

async function loginUser (req , res) {
    const {email , username , password} = req.body

    const user = await userModel.findOne({
        $or :[
            {email},
            {username}
        ]
    })

    if(!user){
        return res.status(404)
        .json({
            message : 'User not found'
        })
    }

    const isCorrectPassword = await bcrypt.compare(password , user.password)
    console.log(isCorrectPassword)

    if( !isCorrectPassword){
        return res.status(401).json({
            message : 'Invalid password'
        })
    }


    const token = jwt.sign({id: user._id} , process.env.JWT_SECRET , {expiresIn : '1d'})
    res.cookie('token' , token , {httpOnly : true})

    res.status(200)
    .json({
        message : 'User logged In successfully'
    })
}



module.exports ={
    registerUser,
    loginUser
}