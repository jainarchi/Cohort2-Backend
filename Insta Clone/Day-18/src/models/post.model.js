const mongoose = require('mongoose')


const postSchema = new mongoose.Schema({
    caption:{
        type: String,
        default: ''
    },
    postUrl:{
        type: String,
        required: [true , 'postUrl is required']
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required : [true , 'user is required to create a post']
    }

})


const postModel = mongoose.model('post' , postSchema)

module.exports = postModel