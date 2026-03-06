const { Router } = require('express')
const authRouter = Router()
const {authUser} = require('../middlewares/auth.middleware')
const authControllers = require('../controllers/auth.controller')


/**
 * @route POST api/auth/register 
 */
authRouter.post('/register' , authControllers.register )



/**
 * @router POST api/auth/login
 */
authRouter.post('/login' , authControllers.login )



/**
 * @route GET api/auth/get-me
 */

authRouter.get('/get-me' , authUser , authControllers.getMe  )


/**
 * @route POST api/auth/logout
 */
authRouter.post('/logout' , authControllers.logout )




module.exports = authRouter