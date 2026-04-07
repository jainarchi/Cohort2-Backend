import express from "express"


const app = express()


app.get('/langgraph' , (req , res) => {
    res.send('start langgraph')
})


export default app