const mongoose = require('mongoose')


const songSchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true , 'title is required to create a song']

    },
    songUrl :{
        type: String,
        required : [true , 'song url is required']

    },
    posterUrl:{
        type: String,
        required : [true , 'image url is required']
    },
    catagory:{
        type : String,
        enum:{
            values: ['sad' , 'happy' , 'surprise'],
            message : "this is enum"
        }
    }
})

const songModel = mongoose.model('songs' , songSchema )

module.exports = songModel