const mongoose = require('mongoose')


const userSchema= new mongoose.Schema({
    username :{
        type: String,
        required: [true, 'username is required'],
        unique: [true, 'username is already exists']
    },
    email:{
        type: String,
        required: [true, 'email is required'],
        unique: [true, 'email already exists']
    },
    password:{
        type: String,
        required: [true, 'password is required']
    },
    bio:{
        type: String,
    },
    profileImage:{
        type : String,        
        default: "https://ik.imagekit.io/hnoglyswo0/avatar-gender-neutral-silhouette-vector-600nw-2470054311.webp"
    }  
})



const userModel = mongoose.model('user' , userSchema)

module.exports = userModel