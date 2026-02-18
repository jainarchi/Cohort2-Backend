const express = require('express')
const authControllers = require('../controllers/user.controller')

const authRouter = express.Router();


// post /api/auth/register

authRouter.post('/register' , authControllers.registerUser) 
authRouter.post('/login' , authControllers.loginUser)




module.exports = authRouter