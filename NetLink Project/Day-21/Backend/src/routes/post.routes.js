const express = require('express')
const identifyUser = require('../middlewares/auth.middleware')
const postControllers = require('../controllers/post.controller')

const postRouter = express.Router();
const multer = require('multer')
const upload = multer({storage : multer.memoryStorage()})






/**
 * @route GET /api/posts/feed
 * @description get all the post created in the DB
 * @access private
 */

  postRouter.get('/feed' , identifyUser , postControllers.getFeed)




/**
  @route POST /api/posts/
  @description Create a post with the image  provided in the req body. The post should be associated with the user that the request come from
  @access private
*/
postRouter.post('/' ,  identifyUser , upload.single('postImage') , postControllers.createPost )



/** 
  @route GET  /api/posts/:id
  @description  give all the post of a logged in user
  @access private
*/
postRouter.get('/' , identifyUser , postControllers.getPost )


/** 
 @route DELETE  /api/posts/:id
 @description 
*/
postRouter.delete('/:id' , identifyUser, postControllers.deletePost )


/**
  GET /api/posts/:id  
  @description give post details of required post (id)
*/
postRouter.get('/:id' , identifyUser , postControllers.getPostDetails)


/* 
  PATCH  /api/posts/:id
  edit caption 
*/

postRouter.patch('/:id' , identifyUser , postControllers.editPost  )

/*
 POST /api/posts/like/:id
*/
postRouter.post('/like/:id' , identifyUser , postControllers.likePost)



/** 
*  @route      POST /api/posts/unlike/:id
*  @description  
   @access private
*/
postRouter.post('/unlike/:id' , identifyUser , postControllers.unlikePost)







module.exports = postRouter