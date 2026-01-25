// server start 

const app = require("./src/app")


let notes = [];


app.post('/notes' , (req , res) =>{
    notes.push(req.body);
    res.status(201)
    .json({message: "resource created successfully"})
})


app.get('/notes' , (req , res) =>{
    res.status(200)
    .json({
        allnotes : notes ,
    })
})


app.delete('/notes/:index' , (req , res) =>{
       delete notes[req.params.index];
       res.status(204)                              // not show msg
       .json({
        message: "note deleted successfully"
       })
})


app.patch('/notes/:index' , (req , res) =>{
    notes[req.params.index].description = req.body.description

    res.status(200).json({message: "modified successfully"})
})







app.listen(3000 , () =>{
    console.log('server listen on PORT 3000');
});
