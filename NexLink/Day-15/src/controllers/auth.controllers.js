const userModel = require('../models/user.model')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')


async function registerUser (req , res) {

    const {username, email , password , bio , profileImage} = req.body

    if(!email || !password || !username){
        return res.status(400).json({message : 'some fields are missing'})
    }
     
    const userExists = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if(userExists){
        return res.status(409)
        .json({
            message : username == userExists.username ? 'username is already exists' : 'email is already exists'
        })
    }


    const user = await userModel.create({
        username ,
        email,
        bio,
        profileImage,
        password : crypto.createHash('sha256').update(password).digest('hex')
    })
    

    const token = jwt.sign({id : user._id} , process.env.JWT_SECRET , {expiresIn : '1d'})

    res.cookie('token' , token , {httpOnly : true})
    
    res.status(201)
    .json({
        message : 'User regiter successfully'
    })


}


async function loginUser (req , res) {
    const {email, password , username} = req.body

    const user = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if(!user){
        return res.status(404)
        .json({
            message : 'User not found'
        })
    }

    const hash = crypto.createHash('sha256').update(password).digest('hex')

    if(hash !== user.password){
        return res.status(401).json({
            message : 'Invalid password'
        })
    }

   const token = jwt.sign({id: user._id} , process.env.JWT_SECRET , {expiresIn : '1d'})

   res.cookie('token' , token , {httpOnly : true})

   res.status(200)
   .json({
    message : 'User logged in successfully'
   })

}






module.exports={
    registerUser,
    loginUser
}