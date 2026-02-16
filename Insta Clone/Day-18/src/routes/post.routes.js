const express = require('express')
const multer = require('multer')
const upload = multer({storage : multer.memoryStorage()})
const postControllers = require('../controllers/post.controllers')
const identifyUser = require('../middlewares/auth.middleware')

const postRouter = express.Router()



// POST /api/post/

postRouter.post('/' , identifyUser , upload.single('imageUrl') ,  postControllers.createPost )

// GET /api/post
postRouter.get('/' , identifyUser , postControllers.getPosts )


//  GET /api/post/details/:id
postRouter.get('/details/:id' , identifyUser , postControllers.getDetails)

module.exports = postRouter
