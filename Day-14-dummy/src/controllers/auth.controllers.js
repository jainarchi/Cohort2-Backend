const userModel = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  const { email, name, password } = req.body;

  const isUserExists = await userModel.findOne({ email });

  if (isUserExists) {
    return res.status(409).json({
      message: "User already exists",
    });
  }

  const user = await userModel.create({
    name,
    email,
    password: crypto.createHash("sha256").update(password).digest("hex"),
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.cookie("token", token, { httpOnly: true });

  res.status(201).json({
    message: "user register successfully",
  });
}

async function login(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const hash = crypto.createHash("sha256").update(password).digest("hex");

  if (hash !== user.password) {
    return res.status(401).json({
      message: "Invalid Password",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.cookie("token", token, { httpOnly: true });

  res.status(200).json({
    messsage: "user logged in successfully",
  });
}



async function getDetails(req, res) {
  const token = req.cookies.token;
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } 
  catch (err) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  const user = await userModel.findById(decoded.id);

  res.status(200).json({
    name: user.name,
    id: user._id,
  });



}

module.exports = {
  registerUser,
  login,
  getDetails,
};
