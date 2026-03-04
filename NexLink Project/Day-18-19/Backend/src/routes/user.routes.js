const express = require('express')
const identifyUser = require('../middlewares/auth.middleware')
const followControllers = require('../controllers/follow.controllers')

const userRouter = express.Router()



// POST   /api/user/follow/username
userRouter.post('/follow/:id' , identifyUser , followControllers.followUser )


// Delete /api/user/unfollow/username 
userRouter.delete('/unfollow/:id' , identifyUser , followControllers.unfollowUser )



module.exports = userRouter
