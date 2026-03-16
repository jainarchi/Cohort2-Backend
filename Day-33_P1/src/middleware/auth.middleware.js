import jwt from 'jsonwebtoken'


export const userAuth = (req , res ,next) =>{
    const token = req.cookies.token

    if(!token){
        return res.status(400)
        .json({
            message : 'Unauthorized',
            success : false ,
            err: 'Token not provided'
        })
    }

    try{
        let decoded = jwt.verify(token , process.env.JWT_SECRET)
        req.user = decoded
        next()
        
    }
    catch(err){
        res.status(400)
        .json({
            message : "Unauthorized",
            success : false,
            err: "Invalid token"
        })
    }
}