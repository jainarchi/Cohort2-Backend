const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    username : {
        type : String ,
        required : [true , "Username is required"],
        unique : [true , "Username must be unique"]
    },
    email :{
        type : String,
        required : [true , "Email is required"],
        unique : [true , "email must be unique"]
    },
    password:{
        type : String ,
        required : [true , "Password is required"],
        select: false

    }
})


const userModel = mongoose.model('user' , userSchema);

module.exports = userModel


// userSchema.pre("save" , function(next) { })
// userSchema.post("save" , function(next) { })


