const mongoose = require('mongoose')



const postSchema = new mongoose.Schema({
    caption:{
        type: String,
        default: ""
    },
    postUrl:{
        type: String,
        required: [true , 'postUrl is required to create a post']
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required : [true , 'userId is required to create a post']
    }

})


const postModel = mongoose.model('post' , postSchema)

module.exports = postModel