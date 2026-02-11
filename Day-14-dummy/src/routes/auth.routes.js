const express = require('express')
const authControllers = require('../controllers/auth.controllers')


const authRouter = express.Router()


authRouter.post('/register' , authControllers.registerUser)
authRouter.post('/login' , authControllers.login)
authRouter.get('/get-me' , authControllers.getDetails)






module.exports = authRouter