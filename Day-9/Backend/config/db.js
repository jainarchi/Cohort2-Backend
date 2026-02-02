const mongoose = require('mongoose')

const connectToDB = () =>{
    mongoose.connect(process.env.MONGO_URI)
    .then(() =>{
        console.log('connect to DB')
    })
}


module.exports = connectToDB ;