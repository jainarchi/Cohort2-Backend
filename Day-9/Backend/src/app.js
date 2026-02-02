const express = require('express')

const app = express();
app.use(express.json())
const notesModel = require('../models/notes.model')

const cors = require('cors')
app.use(cors())



app.post('/api/notes' , async (req , res) => {
      const {title , description} = req.body

       await notesModel.create({
            title ,
            description
          })

          res.status(201)
          .json({
            message: "note create successfully"
          })
})


app.get('/api/notes' , async (req , res) =>{
      const notes = await notesModel.find()

      res.status(200)
      .json({
        message : "notes fetch successfully",
        notes
      })
})


app.patch('/api/notes/:id' , async (req , res) =>{
    const id  = req.params.id
    const {description} = req.body

    await notesModel.findByIdAndUpdate(id , {description})

    res.status(200)
    .json({
        message: "node modifed"
    })
})


app.delete('/api/notes/:id' , async (req , res) =>{
    const id = req.params.id

    await notesModel.findByIdAndDelete(id);
    res.status(204)
    .json({
        message : "note deleted successfully"
    })
})



module.exports = app ;