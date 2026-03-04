const mongoose = require('mongoose')

const connectToDB = () =>{
    mongoose.connect(process.env.MONGO_URI)
    .then(() =>{
        console.log('DB connected')
    })
    .catch((err) =>{
        console.log("DB err" , err)
    })
}


module.exports = connectToDB