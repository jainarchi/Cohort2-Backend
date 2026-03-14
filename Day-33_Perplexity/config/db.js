import mongoose from "mongoose";


const connectToDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log('DB connected')
    }
    catch(err){
        console.log('DB err' , err)
    }
}


export default connectToDB