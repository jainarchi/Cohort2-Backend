const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')


const app = express()
app.use(express.json())
app.use(cookieParser())

app.use(cors({ 
    credentials : true,
    origin : 'http://localhost:5173'
}))


const authRouter = require('../src/routes/auth.routes')
const postRouter = require('../src/routes/post.routes')
const userRouter = require('../src/routes/user.routes')


app.use('/api/auth' , authRouter)
app.use('/api/post' , postRouter)
app.use('/api/user' , userRouter)

module.exports = app