const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

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

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
   
});


userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};



const userModel = mongoose.model('user' , userSchema);

module.exports = userModel




 // value asign / reaign - modify  
 // isModified used to  
 // prevent double hash password on update other field because login not work if password not match.