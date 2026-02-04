const express = require('express')
const notesModel = require('../models/notes.model')

const app = express();
app.use(express.json())


// const cors = require('cors')
// app.use(cors())

app.use(express.static('./dist'))          // dist make publically available



app.post('/api/notes' , async (req , res) =>{

    const {title , description} = req.body
    await notesModel.create({
        title ,
        description
    })

    res.status(201)
    .json({
        message : "note created successfully"
    })

})



app.get('/api/notes', async (req , res)=>{
    const notes = await notesModel.find()

    res.status(200)
    .json({
        notes
    })
})



app.delete('/api/notes/:id' , async (req , res) =>{

      const id = req.params.id
      await notesModel.findByIdAndDelete(id)

      res.status(200)
      .json({
        message: "Delete note successfully"
      })
})




app.patch('/api/notes/:id' , async(req , res) =>{
    const {description} = req.body
    const id = req.params.id 

    await notesModel.findByIdAndUpdate(id , {description})

    res.status(200)
    .json({
         message : "note modify successfully"
    })
})






module.exports = app ;

