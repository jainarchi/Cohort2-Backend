const mongoose = require('mongoose')


async function connectToDB(req , res) {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log('DB connected')
    }
    catch(err){
        console.log('DB connection error')
    }
}



module.exports = connectToDB