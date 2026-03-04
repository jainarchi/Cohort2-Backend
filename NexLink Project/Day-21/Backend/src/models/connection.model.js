const mongoose = require("mongoose");

const connectionSchmema = new mongoose.Schema(
  {
    user1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: [true, "follower is required for following"],
    },

    user2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "following is required to follow"],
    },

    requestedBy :{
      type : mongoose.Schema.Types.ObjectId,
      ref: "user",
      required : [true , "requestedBy is required"]
      
    },
    status :{
      type :String,
      enum : ['pending' , 'accepted' ,'rejected' ],   // rej me delete
      default : 'pending',
      required: [true , 'status is required']
    }
  },
  {
    timestamps: true,
  },
);


connectionSchmema.index({user1 : 1 , user2 : 1 } , {unique : true })  // handle race condition also


const connectionModel = mongoose.model('connection' , connectionSchmema);
module.exports = connectionModel