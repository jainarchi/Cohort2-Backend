const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "User required to create a post"],
    },
    postUrl: {
      type: String,
      required: [true, "post is required to create post"],
    },
    caption: {
      type: String,
      default: "",
    }
  },
  {
    timestamps: true,
  },
);


const postModel = mongoose.model('post' , postSchema )

module.exports = postModel;