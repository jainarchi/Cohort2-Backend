const mongoose = require('mongoose')

const connectToDB = () =>{
    mongoose.connect(process.env.MONGO_URI)
    .then(() =>{
        console.log('DB Connected')
    })
}


module.exports = connectToDB