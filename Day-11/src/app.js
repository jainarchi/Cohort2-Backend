const express = require('express')
const authRoute  = require('../routes/Auth.route')

const app = express()
app.use(express.json())



app.use('/api/auth' , authRoute)




module.exports = app