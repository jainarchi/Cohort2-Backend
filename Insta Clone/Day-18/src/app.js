const express = require('express')
const cookieParser = require('cookie-parser')
const authRouter = require('../src/routes/auth.routes')
const postRouter = require('../src/routes/post.routes')
const followRouter = require('../src/routes/follow.routes')

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth' , authRouter)
app.use('/api/post' , postRouter)
app.use('/api/connection' , followRouter)

module.exports = app