const { Router } = require('express')
const authControllers = require('../controllers/auth.controllers')




const authRouter = Router()




// POST   '/register 
authRouter.post('/register' , authControllers.register )


authRouter.post('/login' , authControllers.login)



module.exports = authRouter
