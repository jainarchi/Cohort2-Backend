const userModel = require("../models/user.model");
const followModel = require("../models/follow.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function registerUser(req, res) {
  const { username, email, password, bio, profileImage } = req.body;

  const userExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (userExists) {
    return res.status(409).json({
      message: "User already exists.",
    });
  }
  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    bio,
    profileImage,
    password: hash,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.cookie("token", token, { httpOnly: true });

  res.status(201).json({
    message: "User register successfully.",
  });
}

async function loginUser(req, res) {
  const { username, email, password } = req.body;

  const user = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(401).json({
      message: "Invalid password, unauthorized access",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.cookie("token", token, { httpOnly: true });

  res.status(200).json({
    message: "User logged in successfully",
  });
}

async function getMe(req, res) {
  const user = await userModel.findById(req.user.id);

  res.status(200).json({
    message: "User details fetched successfully",
    username: user.username,
    email: user.email,
    bio: user.bio,
    profileImage: user.profileImage,
  });
}

async function followUser(req, res) {
  try {
    const followerId = req.user.id;
    const followingId = req.params.id;

    const validUser = await userModel.findById(followingId);

    if (!validUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const follows = await followModel.create({
      follower: followerId,
      following: followingId,
    });

    res.status(200).json({
      message: "Following request sent successfully.",
      follows,
    });
  } catch (err) {
    // duplicate key err collection
    // handle race conditon also
    if ((err.code = 11000)) {
      return res.status(409).json({
        message: "Following request already sent",
      });
    }

    res.status(500).json({
      message: "Internal server error",
    });
  }
}



async function getPendingRequest(req, res) {
  try {
    const userId = req.user.id;

    const pendingRequest = await followModel.find({
      following: userId,
      status: "pending",
    });

    res.status(200).json({
      message: "fetch all Pending request successfully",
      pendingRequest,
    });
  } catch (err) {
    res.status(200).json({
      message: "Internal server error",
    });
  }
}


async function acceptRequest(req, res) {
  try {
    const requestId = req.params.id;

    const modifyRequest = await followModel.findByIdAndUpdate(
        requestId,
      {
        status: "accept",
      },
      {
        new : true
      }
    );

    res.status(200).json({
      message: "You accept the request.",
      modifyRequest,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
}



async function rejectRequest(req, res) {
  try {
    const requestId = req.params.id;

    const modifyRequest = await followModel.findByIdAndUpdate(
      {
        requestId,
      },
      {
        status: "reject",
      },
    );

    res.status(200).json({
      message: "You reject the request.",
    });


  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
}




async function unfollowUser(req, res) {
  try {
    const followingId = req.params.id;
    const followerId = req.user.id;

    const validId = await userModel.findById(followingId);
    if (!validId) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    const follows = await followModel.findOneAndDelete({
      follower: followerId,
      following: followingId,
    });

    if (!follows) {
      return res.status(400).json({
        message: "You already not followed",
      });
    }

    res.status(200).json({
      message: "Successfully unfollowed",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}




module.exports = {
  registerUser,
  loginUser,
  getMe,
  followUser,
  unfollowUser,
  getPendingRequest,
  acceptRequest,
  rejectRequest,
};
