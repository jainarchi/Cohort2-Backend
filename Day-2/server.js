const express = require("express");

const app = express();
app.use(express.json())          // by def server is not capable to read req.body that's why we use this middleware 



let notes = [
    {
        "title" : "title 1",
        "description" : "desp 1 "
    },
    {
        "title" : "title 2",
        "description" : "desp 2 "
    } ,
    {
        "title" : "title 3",
        "description" : "desp 3 "
    }
]       




app.post('/notes' , (req , res) =>{               // post method - create new resource of data
    notes.push(req.body);

    res.send('note saved successfully') 
})



app.get('/notes' , (req , res) =>{                       
    res.send(notes);
})



app.delete('/notes/:index' , (req , res) => {          
    delete notes[req.params.index]                       // replace with null
    res.send('delete successfully ')

})



app.patch('/notes/:index' , (req , res) =>{

   const{ title , description } = req.body
    
   description ? notes[req.params.index].description = req.body.description
               : notes[req.params.index].title = req.body.title ;

    res.send("modified successfully") 
})



app.put('/notes/:index' , (req , res) =>{
     notes[req.params.index] = req.body ;
     res.send("update completely")
})




app.listen(3000);









// create rest api for notes
