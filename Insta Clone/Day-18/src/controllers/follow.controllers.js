const followModel = require('../models/follow.model')
const userModel = require('../models/user.model')




async function followUser(req , res){
  try{
    const followerId = req.user.id
    const followingId = req.params.id

   // prevent self follow
    if( followerId.toString() === followingId.toString() ){
      return res.status(400)
      .json({
        message : 'You can not follow yourself'
      })
    }

    // check user exists
    const followingExists = await userModel.findById( followingId )

    if( ! followingExists){
      return res.status(404)
      .json({
        message : 'User not found'
      })
    }

     // check already followed
    const alreadyFollowed = await followModel.findOne({
      follower : followerId ,
      following : followingId
    })

    if(alreadyFollowed){
      return res.status(409).json({
        message : `You are already following ${followingExists.username}`
      })
    }
    

    // create follow
    const startfollow = await followModel.create({
      follower : followerId ,
      following : followingId
    })
    

    res.status(201)
    .json({
      message : `You started following ${followingExists.username}`,
      startfollow
    })

  }catch(err){
    res.status(500)
    .json({
      message : 'Internal server error'
    })
  }

}



async function unfollowUser(req , res){
  
  const followerId = req.user.id          
  const followingId = req.params.id


  if(followerId.toString() === followingId.toString()){
    return res.status(400)
    .json({
      message : 'You can not unfollow yourself'
    })
  }

  const followingExists = await userModel.findById( followingId )

  if(! followingExists){
    return res.status(404)
    .json({
      message : 'User not found'
    })
  }


 // if followed then delete
  const followed = await followModel.findOneAndDelete({
    follower : followerId,
    following : followingId  
  })


  if(! followed){
    return res.status(400)
    .json({
      message : `You are already not followed ${followingExists.username}`
    })
  }

  res.status(200)
  .json({
    message : `You unfollowed ${followingExists.username}`
  })


}


module.exports = {
  followUser,
  unfollowUser
  
}