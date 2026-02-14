const express = require('express')
const authControllers = require('../controllers/user.controller')

const authRouter = express.Router();


// post /api/auth/register

authRouter.post('/register' , authControllers.registerUser) 



module.exports = authRouter