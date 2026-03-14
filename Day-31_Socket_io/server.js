import app from './src/app.js'
import { createServer } from "http";
import { Server } from "socket.io";


const httpServer = createServer(app)
const io = new Server(httpServer, { /* options */ });



io.on("connection", (socket) => {
 console.log('new client connected to server')

    socket.on("message", (msg) =>{
        console.log('user fired a message event with msg -' , msg.data)
        
        // first Save message to DB


        // io.emit('new msg' , msg )   // fire / send event to all client include sender

        socket.broadcast.emit('new msg' , msg)   // exclude sender


    })

})




httpServer.listen(4000 , () =>{
    console.log('server listen on PORT 4000')
})