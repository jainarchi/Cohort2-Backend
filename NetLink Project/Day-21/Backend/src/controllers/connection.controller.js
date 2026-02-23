const connectionModel = require('../models/connection.model');
const userModel = require('../models/user.model')
// add validator for id 


async function sentConnectionReq(req , res){
  
  try{
  const currentUser = req.user.id    
  const targetUser = req.params.id

  if(currentUser === targetUser){
    return res.status(400)
    .json({
      message : "Cannot send connection req yourself"
    })
  }

  const validateTarget = await userModel.findById(targetUser)

  if(! validateTarget){
     return res.status(404)
     .json({
      message : 'User not found.'
     })
  }

// sort prevent dup in db , in db (u1 , u2) != (u2 , u1)
  const [user1 , user2] = (currentUser < targetUser) 
  ? [currentUser , targetUser] 
  : [targetUser , currentUser]


  const isExists = await connectionModel.findOne({user1 , user2});
  if(isExists){
    return res.status(409)
    .json({
       message : 'Connection already exists or pending.'
    })
  }

  const sentConnection = await connectionModel.create({
      user1,
      user2,
      requestedBy : currentUser
  })

  res.status(201)
  .json({
    message : 'Connection request sent successfully.',
    sentConnection
  })

  
  }catch(err){
    // duplicate key err coll - handle race conditon
    if(err.code === 11000){
      return res.status(409)
      .json({
        message : 'Connection already exists or pending.'
      })
    }


    res.status(500)
    .json({
      message : 'Internal server error.'
    })
  }

  


}



async function withdrawRequest(req , res) {
  try{
   const requestId = req.params.id
   const currentUser = req.user.id
   
   const withdraw = await connectionModel.findOneAndDelete({
    _id : requestId,
    requestedBy : currentUser,
    status : "pending"
   })

   if(! withdraw){
    return res.status(404)
    .json({
      message: "Request not found."
    })
   }

   res.status(200)
   .json({
    message : "Withdraw connection request successfully.",
    withdraw
   })

   }catch(err){
     res.status(500)
     .json({
      message : "Internal server error."
     })
   }
}



async function getPendingConnectionReq(req, res) {
  try {
    const currentUser = req.user.id; 
             
    const pendingRequests = await connectionModel.find({
      status: "pending",
      requestedBy : { $ne : currentUser},
      $or:[
        {user1 : currentUser},
        {user2 : currentUser}
      ]
    }).populate("requestedBy" , 'username bio profileImage')


    res.status(200).json({
      message: "fetched all Pending request.",
      pendingRequests,
    });

    
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
}



async function acceptRequest(req, res) {
  try {
    const requestId = req.params.id;
    const currentUser = req.user.id

    const modifyRequest = await connectionModel.findOneAndUpdate(
      {
        _id: requestId,
        status: "pending",
        requestedBy: {$ne : currentUser},
        $or :[
          {user1 : currentUser},
          {user2 : currentUser}
        ]
      },
      {
        status: "accepted",
      },
      {
        returnDocument: "after",
      },
    );

    if (!modifyRequest) {
      return res.status(400).json({
        message: "Request not found or not pending. ",
      });
    }

    res.status(200).json({
      message: "Now you have a new connection.",
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
    const currentUser = req.user.id

    const modifyRequest = await connectionModel.findOneAndUpdate(
      {
        _id: requestId,
        status: "pending",
        requestedBy : {$ne : currentUser},
        $or :[
          {user1 : currentUser},
          {user2 : currentUser}
        ]
      },
      {
        status: "rejected",
      },
      {
        returnDocument: "after",
      },
    );

    if (!modifyRequest) {
      return res.status(400).json({
        message: "Request not found or not pending.",
      });
    }

    res.status(200).json({
      message: "You rejected connection request.",
      modifyRequest,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
}




async function removeConnection(req , res){

  try{
  const u1 = req.user.id;
  const u2 = req.params.id;

  // connection exists u2 exists

  const [user1 , user2] = (u1 < u2) ? [u1 , u2] :[u2 , u1];

  const removedConnection = await connectionModel.findOneAndDelete({
     user1 ,
     user2,
     status : "accepted"
  })


   if(! remove){
     return res.status(400)
     .json({
      message : "Already not connected."
     })
   }

   res.status(200)
   .json({
      message : "Connection successfully removed.",
      removedConnection
   })

}catch(err){
   res.status(500)
   .json({
    message : "Internal server error."
   })
}

}




async function getAllConnections (req , res){

 try {
  const currentUser = req.user.id
    
  const connections = await connectionModel.find({
    status: "accepted",
    $or:[
      {user1 : currentUser},
      {user2 : currentUser}
    ]
  })

  res.status(200)
  .json({
    message : 'All connections fetched successfully',
    connections
  })

 } catch(err){
  res.status(500)
  .json({
    message : 'Internal server error.'
  })
 }






}


module.exports = {
    sentConnectionReq,
    getPendingConnectionReq,
    acceptRequest,
    rejectRequest,
    withdrawRequest,
    removeConnection,
    getAllConnections
}