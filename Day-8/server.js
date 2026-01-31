const app = require('./src/app')
require('dotenv').config()
const connectToDB = require('./config/db')






connectToDB();

app.listen(3000 , (req , res) =>{
    console.log("server listen on PORT 3000");
})