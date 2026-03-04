require('dotenv').config()
const app = require('./src/aap')
const connectToDB = require('./src/config/db')





connectToDB()

app.listen(3000 , () =>{
    console.log('Server runing on PORT 3000')
})

