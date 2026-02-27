const express = require('express');
const identifyUser = require('../middlewares/auth.middleware')
const connectionController = require('../controllers/connection.controller')



const connectionRequestRouter = express.Router()
const connectionRouter = express.Router()

/* 
Request   sent connection req
   POST  api/connection/request/:id
   :id - other user id
*/
connectionRequestRouter.post('/:id' , identifyUser , connectionController.sentConnectionReq)



/**
   @description withdraw req 
   @route PATCH api/connection/request/withdraw/:id  
   :id - connectionId _id
*/
connectionRequestRouter.delete('/withdraw/:id' , identifyUser , connectionController.withdrawRequest)




/**  
   @description show all pending request
   @route GET   api/connection/request/pending
   :id - connectionId _id
*/
connectionRequestRouter.get('/pending' , identifyUser  , connectionController.getPendingConnectionReq)




/**
  @route PATCH   api/connection/request/accept/:id  
   :id - connectionId _id
*/
connectionRequestRouter.patch('/accept/:id' , identifyUser , connectionController.acceptRequest )



/*  
   PATCH   api/connection/request/reject/:id   
   :id - connectionId _id
*/
connectionRequestRouter.patch('/reject/:id' , identifyUser , connectionController.rejectRequest )



/*  
   DELETE   api/connection/remove/:id   
   :id - other user id
*/

connectionRouter.delete('/remove/:id' , identifyUser , connectionController.removeConnection)



/*  
   show all connection
   GET   api/connection 
*/

connectionRouter.get('/' , identifyUser , connectionController.getAllConnections)



module.exports = {
   connectionRequestRouter,
   connectionRouter
}