import { useState , useEffect } from "react"
import axios from 'axios'
import './app.css'




const App = () => {
   const [notes, setNotes] = useState([]) 


  useEffect(() => {

    axios.get('http://localhost:3000/api/notes')
    .then((res) =>{
        setNotes(res.data.notes);
    })
    
  }, [])
   



  return (
    <div>
      <h1>All Notes</h1>


      <div className="notes">
        {
          notes.map((note) =>(
             <div className="note">
               <h3 className="title">{note.title}</h3>
               <p className="desp">{note.description}</p>
            </div>
          ))
        }
        
      </div>

      
    </div>
  )
}

export default App
