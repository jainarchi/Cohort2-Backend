const express = require('express')
const authControllers = require('../controllers/auth.controller')
const identifyUser = require('../middlewares/auth.middleware')


const authRouter = express.Router()


// POST api/auth/register
authRouter.post('/register' , authControllers.registerUser  )


// POST api/auth/login
authRouter.post('/login' , authControllers.loginUser )


// GET api/auth/get-me
authRouter.get('/get-me' , identifyUser , authControllers.getMe )






module.exports = authRouter