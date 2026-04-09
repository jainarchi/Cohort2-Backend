import mongoose from "mongoose";
import {config} from "./config.js"




const connectToDB = () =>{
    mongoose.connect(config.MONGO_URI)
    .then(() => console.log('Database connected'))
    .catch(err => console.log('DB Connection Error' , err))
}

export default connectToDB