const jwt = require('jsonwebtoken')


const identifyUser = async (req , res , next) =>{
    const token = req.cookies.token
    
    if(! token ){
        return res.status(404)
        .json({
            message : 'Token not found'
        })
    }

    try{
     const decoded = jwt.verify(token , process.env.JWT_SECRET )
     req.user = decoded
     next()

    }
    catch(err){
        return res.status(401)
        .json({
            message : 'Invalid signature'
        })
    }

}


module.exports = identifyUser