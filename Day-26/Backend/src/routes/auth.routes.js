const { Router } = require('express')
const authControllers = require('../controllers/auth.controllers')
const authMiddlewares = require('../middlewares/auth.middleware')



const authRouter = Router()




// POST   '/register 
authRouter.post('/register' , authControllers.register )


authRouter.post('/login' , authControllers.login)


authRouter.get('/get-me' , authMiddlewares.authUser ,  authControllers.getMe)


authRouter.post('/logout' , authControllers.logout)


module.exports = authRouter
