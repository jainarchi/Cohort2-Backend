const express = require('express')
const authControllers = require('../controllers/auth.controller')
const identifyUser = require('../middlewares/auth.middleware')


const authRouter = express.Router()
const userRouter = express.Router()
const requestRouter = express.Router()


// POST api/auth/register
authRouter.post('/register' , authControllers.registerUser  )


// POST api/auth/login
authRouter.post('/login' , authControllers.loginUser )


// GET api/auth/get-me
authRouter.get('/get-me' , identifyUser , authControllers.getMe )





// POST    api/user/unfollow/:id
userRouter.post('/follow/:id' , identifyUser , authControllers.followUser )


// DELETE   api/user/unfollow/:id
userRouter.delete('/unfollow/:id' , identifyUser , authControllers.unfollowUser)



/* 
   show all pending request
   GET   api/request/pending
*/
requestRouter.get('/pending' , identifyUser  , authControllers.getPendingRequest)




//   PATCH   api/request/accept/:id

requestRouter.patch('/accept/:id' , identifyUser , authControllers.acceptRequest )



//   PATCH   api/request/reject/:id

requestRouter.patch('/reject/:id' , identifyUser , authControllers.rejectRequest )





module.exports = {
    authRouter,
    userRouter,
    requestRouter
}