const jwt = require('jsonwebtoken')

async function identifyUser(req , res , next) {
    const token = req.cookies.token

    if(!token){
        return res.status(404)
        .json({
            message : 'token not provided, please login'
        })
    }

    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET)
        req.user = decoded
        next()

    }catch(err){
        res.status(401).json({
            message: 'Invalid token, unauthorized'
        })
    }
}

module.exports = identifyUser