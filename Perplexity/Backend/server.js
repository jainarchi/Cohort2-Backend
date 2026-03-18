import "dotenv/config"
import app from './src/app.js'
import connectToDB from "./src/config/db.js"


const PORT = process.env.PORT




connectToDB()

app.listen(PORT , () =>{
    console.log('server listen on PORT ' , PORT)
})