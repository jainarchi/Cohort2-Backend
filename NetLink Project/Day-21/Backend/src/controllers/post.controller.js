const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});



async function createPost(req, res) {
    
   try {
  const file = await client.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "fileName",
    folder: "D-21",
  });

  const post = await postModel.create({
    user: req.user.id,
    caption: req.body.caption,
    postUrl: file.url,
  });

  res.status(201).json({
    message: "post created successfully",
    post,
  });
}catch(err){
    res.status(500)
    .json({
        message : 'Internal server error'
    })
}
}




async function getPost(req, res) {
  try {
    const id = req.user.id;
    const posts = await postModel.find({ user: id });

    return res.status(200).json({
      posts,
    });

  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
}




async function getPostDetails(req, res) {
  try {
    const id = req.params.id;
    const post = await postModel.findById(id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const validUser = post.user.toString() === req.user.id;

    if (!validUser) {
      return res.status(403).json({
        message: "Forbidden Content",
      });
    }

    res.status(200).json({
      message: "Details fetched successfully",
      post,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}




async function deletePost(req, res) {
  try {
    const postId = req.params.id;

    const post = await postModel.findOneAndDelete({
      _id: postId,
      user: req.user.id,
    });

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
}




async function editPost(req , res) {
   const postId = req.params.id
   const caption = req.body.caption

   const post = await postModel.findOneAndUpdate({
    _id : postId,
    user : req.user.id
   } , {
    caption
   })

   if(!post){
    return res.status(404)
    .json({
        message : 'Post not found.'
    })
   }

   res.status(200)
   .json({
    message : 'Caption Updated successfully'
   })


}



module.exports = {
  createPost,
  getPost,
  deletePost,
  getPostDetails,
  editPost
};
