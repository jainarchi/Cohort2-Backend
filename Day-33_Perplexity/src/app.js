import express from 'express'
import authRouter from './controllers/auth.controller'

const app = express()

app.use('/api/auth' , authRouter)


export default app