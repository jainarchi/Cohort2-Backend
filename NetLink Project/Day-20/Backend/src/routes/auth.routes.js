const express = require('express')
const authControllers = require('../controllers/auth.controllers')
const identifyUser = require('../middlewares/auth.middleware')

const authRouter = express.Router()




// /api/auth/register
authRouter.post('/register' , authControllers.registerUser )


// /api/auth/login
authRouter.post('/login' , authControllers.loginUser )


//  api/auth/get-me
authRouter.get('/get-me' , identifyUser , authControllers.getMeUser)



module.exports = authRouter