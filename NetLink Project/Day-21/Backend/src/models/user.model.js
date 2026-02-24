const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique : [true , 'username must be unique'],
        required : [true , 'username is mandatory']
    },
    email:{
        type : String,
        unique : [true, 'Email already exists'],
        required : [true, 'Email is required']
    },
    password:{
        type : String,
        required : [true , 'password is required']
    },
    profileImage :{
        type :String,
        default :"https://ik.imagekit.io/hnoglyswo0/avatar-gender-neutral-silhouette-vector-600nw-2470054311.webp"
    }
})

const userModel = mongoose.model('user' , userSchema)

module.exports = userModel