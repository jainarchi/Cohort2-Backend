// start server 
// connect with db 


const app = require("./src/app")
const mongoose = require('mongoose');
require('dotenv').config();


const connectWithDB = () =>{
    mongoose.connect(process.env.mongoDB_URL/day-6)
}

connectWithDB();


app.listen(3000 , () =>{
    console.log('server on port 3000');
})