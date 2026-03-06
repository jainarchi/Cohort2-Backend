const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


const userSchema = new mongoose.Schema({
    username : {
        type : String,
        require: [true , 'username is required'],
        unique : [true , 'username must be unique']
    },
    email:{
        type : String,
        required : [true , 'Email is requied'],
        unique : [true , 'Email must be unique']
    },
    password :{
        type : String,
        requried : [true , 'password is required'],
        select : false
    }
})



userSchema.pre('save' , async function (next) {
    if(! this.isModified('password')) return next

    this.password = await bcrypt.hash(this.password , 10)
    next
})


userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password , this.password)
}


const userModel = mongoose.model('user' , userSchema)

module.exports = userModel