const postModel = require("../models/post.model");
const jwt = require("jsonwebtoken");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs")



const client = new ImageKit({
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});




async function createPost(req, res) {

    const token = req.cookies.token
    let decoded ;

   try{
    decoded = jwt.verify(token , process.env.JWT_SECRET)
   }
   catch(err){
    return res.status(401).json({
        message : 'token not found'
    })
   }
  


  const file = await client.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file2"),
    fileName: "Test2",
  });
   

  const p = await postModel.create({
    caption : req.body.caption ,
    imageUrl : file.url,
    userId : decoded.id
  })


  res.status(201)
  .json({
        message : 'post created successfully',
        p
  })

}

module.exports = {
  createPost,
};
