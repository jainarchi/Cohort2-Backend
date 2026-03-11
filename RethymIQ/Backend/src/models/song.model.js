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
    artist:{
        type: String,
        requried: [true , 'artist is required']
    },
    album:{
        type : String,
        requried : [true , 'album is required']
    },
    mood:{
        type : String,
        enum:{
            values: ['sad' , 'happy' , 'surprised'],
            message : "this is enum"
        }
    }
},{
    timestamps : true
})

const songModel = mongoose.model('songs' , songSchema )

module.exports = songModel