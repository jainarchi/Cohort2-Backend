const express = require('express')
const userControllers = require('../controllers/auth.controllers')

const authRouter = express.Router()


authRouter.post('/register' , userControllers.registerUser )
authRouter.post('/login' , userControllers.loginUser)




module.exports = authRouter