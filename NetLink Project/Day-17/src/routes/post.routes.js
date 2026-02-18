const express = require('express')
const postRouter = express.Router()
const postController = require('../controllers/post.controller')

const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })


// Post /api/post

postRouter.post('/', upload.single('postImage'), postController.createPost )
postRouter.get('/' , postController.getPosts)
postRouter.get('/details/:postId' , postController.getPostDetails)





module.exports = postRouter