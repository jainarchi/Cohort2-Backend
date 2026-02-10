const app = require('./src/app')
const connectToDB = require('./src/config/db')
require('dotenv').config()




connectToDB()

app.listen(3000 , () =>{
    console.log('Server runing on PORT 3000')
})