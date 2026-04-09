import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema ({
    fullname :{
        type : String,
        required : true,  
        trim: true
    },
    email :{
        type: String,
        required : true,
        unique : true,
        lowercase: true,
        trim: true
    },
    contact :{
        type : String,
        required : true,
        unique : true,
    },
    password :{
        type : String,
        required : true
    },
    role:{
        type :String,
        default : "buyer",
        enum :["buyer", "seller"]
    },
    blocked :{
        type : Boolean,
        default : false
    }
},
{
    timestamps : true
})



userSchema.pre('save' , async function(){
    if(! this.isModified('password')) return
    this.password = await bcrypt.hash(this.password , 10)
})

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password , this.password)
}


const userModel = mongoose.model('user' , userSchema)

export default userModel