const mongoose = require("mongoose");

const followSchema = new mongoose.Schema(
  {
    follower: {
      type: String,
      required: [true, "follower is required"],
    },
    following: {
     type : String,
     required: [true, "following is required"],
    },
  },
  {
    timestamps: true,
  },
);

followSchema.index({ follower: 1, following: 1 }, { unique: true })

const followModel = mongoose.model('follow' , followSchema)

module.exports = followModel