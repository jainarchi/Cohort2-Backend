const express = require('express')
const multer = require('multer')
const upload = multer({storage : multer.memoryStorage()})
const postControllers = require('../controllers/post.controllers')
const identifyUser = require('../middlewares/auth.middleware')

const postRouter = express.Router()





postRouter.post('/' , identifyUser , upload.single('imageUrl') ,  postControllers.createPost )


module.exports = postRouter
