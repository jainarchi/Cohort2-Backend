// start server 
// connect with db 


const app = require("./src/app")
require('dotenv').config();

const mongoose = require('mongoose');

const connectWithDB = () =>{
    mongoose.connect(process.env.mongoDB_URL)
    .then(() =>{
        console.log('DB connected')
    })
}

connectWithDB();



app.listen(3000 , () =>{
    console.log('server on port 3000');
})




// mongoose.connect()  - connect Server to DB
// cluster/db   -  create if not present then connect