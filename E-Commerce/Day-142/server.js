import app from './src/app.js'
import connectToDB from './src/config/db.js'
import { config } from './src/config/config.js'




const startServer = () =>{
    try{
        connectToDB()
        app.listen(config.PORT, () => {
            console.log(`Server is running on port ${config.PORT}`)
        })
    }
    catch(err){
        console.log(err)
        process.exit(1)
    }
}

startServer()