const mongoose = require("mongoose");

const followSchema = new mongoose.Schema(
  {
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: [true, "follower is required for following"],
    },

    following: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: [true, "following is required to follow"],
    },
    status :{
      type :String,
      enum : ['pending' , 'accept' , 'reject'],
      default : 'pending',
      require: [true , 'status is required']
    }
  },
  {
    timestamps: true,
  },
);


followSchema.index({follower : 1 , following : 1 } , {unique : true })  // handle race condition also


const followModel = mongoose.model('follow' , followSchema);
module.exports = followModel
