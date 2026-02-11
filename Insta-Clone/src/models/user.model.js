const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    unique: [true, "Username already exists"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "Email already in use"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  profileImage: {
    type: String,
    default:
      "https://ik.imagekit.io/hnoglyswo0/avatar-gender-neutral-silhouette-vector-600nw-2470054311.webp",
  },
  bio: String,


});


const userModel = mongoose.model('user' , userSchema)


module.exports = userModel
