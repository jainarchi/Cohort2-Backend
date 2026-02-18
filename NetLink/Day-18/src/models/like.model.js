const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "user is required to like the post"],
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
      required: [true, "post is required to like"],
    }
  },
  {
    timestamps: true,
  },
);


likeSchema.index({ user: 1, post: 1 }, { unique: true })


const likeModel = mongoose.model('like' , likeSchema)
module.exports = likeModel
