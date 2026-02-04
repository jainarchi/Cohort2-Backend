const app = require('./src/app')
const connectToDB = require('./config/db')
require('dotenv').config()




connectToDB()


app.listen(3000 , () =>{
    console.log('Server listen on PORT 3000');
})