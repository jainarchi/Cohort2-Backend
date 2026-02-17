const followModel = require('../models/follow.model')



async function followUser(req , res){
   const following = req.params.id
   const follower = req.user.id

  const newfollow = await followModel.create({
    following,
    follower
  })

  res.status(201)
  .json({
    message: 'now you are started following new user',
    newfollow
  })

}





async function unfollowUser(req , res){
  const unfollowUser = await followModel.findOneAndDelete({
    follower : req.user.id,
    following : req.params.id,
  })

  res.status(200).json({
    message : 'you are unfollow a user',
    unfollowUser
  })
}



module.exports ={
    followUser,
    unfollowUser
}