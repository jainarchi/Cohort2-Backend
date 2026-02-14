const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require('jsonwebtoken')




const client = new ImageKit({
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});




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



module.exports = {
  createPost,
};
