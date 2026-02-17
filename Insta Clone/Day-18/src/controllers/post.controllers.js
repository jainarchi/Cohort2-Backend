const postModel = require("../models/post.model");
const likeModel = require("../models/like.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const mongoose = require('mongoose')





const client = new ImageKit({
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});

async function createPost(req, res) {
  const file = await client.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
    folder: "Insta_D18",
  });

  const post = await postModel.create({
    user: req.user.id,
    caption: req.body.caption,
    postUrl: file.url,
  });

  res.status(201).json({
    message: "post created successfully",
    file,
    caption: req.body.caption,
  });
}

async function getPosts(req, res) {
  const posts = await postModel.find({
    user: req.user.id,
  });

  res.status(200).json({
    message: "posts fetch successfully",
    posts,
  });
}

async function getDetails(req, res) {
  const postId = req.params.id;

  const post = await postModel.findById({ _id: postId });

  if (!post) {
    return res.status(404).json({
      message: "post not found",
    });
  }

  const validUser = req.user.id === post.user.toString();

  if (!validUser) {
    return res.status(403).json({
      message: "Forbidden content",
    });
  }

  res.status(200).json({
    message: "post details fetch successfully",
    post,
  });
}



async function likePostController(req, res) {
  try {
    const userId = req.user.id;
    const postId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Invalid post id" });
    }

    const postExists = await postModel.findById(postId);

    if (!postExists) {
      return res.status(404).json({ message: "post not found" });
    }

    const alreadyLiked = await likeModel.findOne({
      user: userId,
      post: postId,
    });

    if (alreadyLiked) {
      return res.status(409).json({ message: "post already liked" });
    }

    await likeModel.create({
      user: userId,
      post: postId,
    });

    res.status(201).json({
      message: "post liked",
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      err,
    });
  }
}

module.exports = {
  createPost,
  getPosts,
  getDetails,
  likePostController,
};
