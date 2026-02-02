const app = require('./src/app')
const connectToDB = require('./config/db')
require('dotenv').config()








connectToDB();



app.listen(3000 , () =>{
    console.log('server listen on PORT 3000')
})