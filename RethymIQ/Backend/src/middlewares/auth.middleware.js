const jwt = require('jsonwebtoken')
const redis = require('../config/cache')



const authUser = async (req , res , next) =>{
    const token = req.cookies.token
    if(!token){
        return res.status(400)
        .json({
            message : 'token not provided'
        })
    }

    const isTokenBlackListed = await redis.get(token)
    
    if(isTokenBlackListed){
        return res.status(400)
        .json({
            message : "Invaild token."
        })
    }
   

    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET)
        req.user = decoded
        next()

    }
    catch(err){
        res.status(400)
        .json({
            message : 'Invalid token.'
        })
    }
}

module.exports = {authUser}