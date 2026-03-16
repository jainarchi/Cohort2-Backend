const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require('jsonwebtoken')




const client = new ImageKit({
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});


// POST  /api/post

async function createPost(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(404).json({
      message: "token not provided",
    });
  }

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401)
    .json({
      message: "Invalid token"
    });
  }
  

  const file = await client.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "fileName",
    folder: "C2-Insta-Clone",
  });
  

  const post = await postModel.create({
    caption: req.body.caption,
    postUrl: file.url,
    userId: decoded.id,
  });



  res.status(201).json({
    message: "post created successfully",
  });
}


// GET  /api/post

async function getPosts(req , res){
    const token = req.cookies.token 

    if(!token){
      return res.status(404)
      .json({
        message : 'token not found'
      })
    }

    let decoded ;

   try{
    decoded = jwt.verify(token , process.env.JWT_SECRET)
   }
   catch(err){
    return res.status(401)
    .json({
      message : 'Invalid token'
    })
   }

   const posts = await postModel.find({
    userId : decoded.id
   })

  res.status(200)
  .json({
    message : 'posts fetch successfully',
    posts
  })

}


// GET /api/post/details/:postId

async function getPostDetails(req , res) {

 const token = req.cookies.token

 if(!token){
  return res.status(404).json({message: 'token not found'})
 }

 let decoded ;

 try{
  decoded = jwt.verify(token , process.env.JWT_SECRET)
 }
 catch(err){
  return res.status(401)
  .json({
    message: 'Invalid token'
  })
 }

  const postId = req.params.postId

  const post = await postModel.findById({_id: postId})

  if(!post){
    return res.status(404).json({
      message : 'post not found'
    })
  }


  const isAuthorized = post.userId.toString() === decoded.id
  

  if(!isAuthorized){
    return res.status(403)
    .json({
      message : 'Forbidden Content'
    })
  }

  res.status(200)
  .json({
    message: 'Details fetch successfully',
    post
  })

}



module.exports = {
  createPost,
  getPosts,
  getPostDetails
};
