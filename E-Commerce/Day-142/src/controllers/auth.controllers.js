import userModel from "../models/user.model.js";
import jwt from 'jsonwebtoken'



const tokenInResponse = (user , res) =>{
    const token = jwt.sign(
        {id : user._id} , 
        process.env.JWT_SECRET_KEY , 
        {expiresIn : "7d"})

    res.cookie("token" , token , {httpOnly : true , expires : new Date(Date.now() + 24 * 7 * 60 * 60 * 1000)})
}



const registerUser = async (req, res) => {
  const { fullname, email, password, contact, role } = req.body;

  try {
    const userExists = await userModel.findOne({
      $or: [{ email }, { contact }],
    });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const user = await userModel.create({
      fullname,
      email,
      password,
      contact,
      role,
    });

    tokenInResponse(user.id , res)

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user
    })


  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }

}


export {
    registerUser
}


