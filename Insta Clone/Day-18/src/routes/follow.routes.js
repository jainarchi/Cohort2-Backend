const express = require('express')
const identifyUser = require('../middlewares/auth.middleware')
const followControllers = require('../controllers/follow.controllers')

const followRouter = express.Router()



// POST   /api/edge/follow/:id
followRouter.post('/follow/:id' , identifyUser , followControllers.followUser )


// Delete /api/edge/unfollow/:id 
followRouter.delete('/unfollow/:id' , identifyUser , followControllers.unfollowUser )



module.exports = followRouter
