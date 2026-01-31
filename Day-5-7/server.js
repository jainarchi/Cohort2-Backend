const app = require('./src/app')
const connectToDB = require('./config/db')
const notesModel = require('./models/notes.model')
require('dotenv').config();


// post /notes

app.post('/notes' , async (req , res) =>{
     const {title , description} = req.body ;
        const note = await notesModel.create({
            title, description
        })


        res.status(201)
        .json({
            message: "note created successfully",
            note
        })

})




app.get('/notes' ,  async (req , res) =>{
     const notes = await notesModel.find();

     res.status(200)
     .json({
        notes
     })

})






connectToDB();

app.listen(3000 , () =>{
    console.log('Server is listen on PORT 3000')
})