const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "user is required to create a"],
    },
    storyImage: {
      required: [true, "Image is required to create a story"],
      type: String,
    },
    caption: {
      type: String,
      default: "",
    },
    expireIn :{}
  },
  {
    timestamps: true,
  },
);


const storyModel = mongoose.model('story' , storySchema)

module.exports = storyModel