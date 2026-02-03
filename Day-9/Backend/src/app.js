const express = require('express')
const path = require('path')
const notesModel = require('../models/notes.model')


const app = express();
app.use(express.json())

const cors = require('cors')
app.use(cors())


/*
*  index.html req for js and css file and these are present inside dist 
    so res is send from here 
*/
app.use(express.static(path.join(__dirname , '..' , 'dist')))


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
    res.status(200)
    .json({
        message : "note deleted successfully"
    })
})






app.get("*name" , (req , res) =>{
    res.sendFile(path.join(__dirname , ".." , "dist" , "index.html") )
})






module.exports = app ;