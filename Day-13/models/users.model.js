const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    username :{
        type: String,
        required :true
    },
    email:{
        type : String,
        required : true,
        unique :[true , 'email exists already']
    },
    password : String
})



const userModel = mongoose.model("users" , userSchema);
module.exports = userModel