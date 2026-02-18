const express = require('express')
const authControllers = require('../controllers/auth.controllers')

const authRouter = express.Router()




// /api/auth
authRouter.post('/register' , authControllers.registerUser )
authRouter.post('/login' , authControllers.loginUser )



module.exports = authRouter