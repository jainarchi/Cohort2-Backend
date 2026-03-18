import express from 'express'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.routes.js'
import { errorHandler } from './utils/errorHandler.js'



const app = express()
app.use(express.json())
app.use(cookieParser())




app.use('/api/auth' , authRouter)






app.use(errorHandler)



export default app