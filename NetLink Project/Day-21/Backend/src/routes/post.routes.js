const express = require('express')
const identifyUser = require('../middlewares/auth.middleware')
const postControllers = require('../controllers/post.controller')
const postRouter = express.Router();
const multer = require('multer')
const upload = multer({storage : multer.memoryStorage()})


/* 
POST /api/post/
*/
postRouter.post('/' ,  identifyUser , upload.single('postImage') , postControllers.createPost )


/* 
  GET  /api/post/:id
*/
postRouter.get('/' , identifyUser , postControllers.getPost )


/* 
 DELETE  /api/post/:id
*/
postRouter.delete('/:id' , identifyUser, postControllers.deletePost )


/* 
  GET /api/post/:id  
*/
postRouter.get('/:id' , identifyUser , postControllers.getPostDetails)


/* 
  PATCH  /api/post/:id
  edit caption 
*/

postRouter.patch('/:id' , identifyUser , postControllers.editPost  )

/*
 POST /api/post/like/:id
*/
postRouter.post('/like/:id' , identifyUser , postControllers.likePost)

/* 
POST /api/post/unlike/:id
*/
postRouter.post('/unlike/:id' , identifyUser , postControllers.unlikePost)




module.exports = postRouter