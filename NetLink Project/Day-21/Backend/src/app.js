const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true
}))



const authRouter = require('./routes/auth.routes') 
const {connectionRouter , connectionRequestRouter} = require('./routes/connection.routes')
const postRouter = require('./routes/post.routes')



app.use('/api/auth' , authRouter)
app.use('/api/posts' , postRouter)
app.use('/api/connection' , connectionRouter)
app.use('/api/connection/request' , connectionRequestRouter)




module.exports = app 