const express = require ("express");

const app = express();  //  express ko call krne se instance create hota h


app.listen(3000 , () =>{
    console.log("server listen on port 3000")
});                                                           // .listen method se server start hota h 




// node server.js               run command 
// npx nodemon server.js        server start automatically