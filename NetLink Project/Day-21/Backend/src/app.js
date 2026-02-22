const express = require('express')
const cookieParser = require('cookie-parser')
const {authRouter, userRouter , requestRouter} = require('./routes/auth.routes') 
const postRouter = require('./routes/post.routes')



const app = express()
app.use(express.json())
app.use(cookieParser())


app.use('/api/auth' , authRouter)
app.use('/api/post' , postRouter)
app.use('/api/user' , userRouter)
app.use('/api/request' , requestRouter)




module.exports = app 