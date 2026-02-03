import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [updatebtn, setUpdatebtn] = useState(false);
  const [noteId, setNoteId] = useState(null)

  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const fetchNotes = () => {
    axios.get("http://localhost:3000/api/notes").then((res) => {
      setNotes(res.data.notes);
      console.log(res.data.notes);
    });
  };



  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const { title, description } = e.target.elements;

  //   axios
  //     .post("http://localhost:3000/api/notes", {
  //       title: title.value,
  //       description: description.value,
  //     })
  //     .then(() => {
  //       fetchNotes();
  //     });

  //   title.value = "";
  //   description.value = "";
  // };




  const handleSubmit = (e) => {
    e.preventDefault();


    if(updatebtn){
      axios.patch('http://localhost:3000/api/notes/'+ noteId , {
        description : form.description
      })
      .then((res) =>{
        console.log(res.data.message);
        fetchNotes();
        setUpdatebtn(false)
        form.description = ""
      })
    }

   else {
     axios
      .post("http://localhost:3000/api/notes", {
        title: form.title,
        description: form.description,
      })
      .then((res) => {
        fetchNotes();
        console.log(res.data.message);
      });
   }
  };




  const handleDelete = (noteId) => {
    axios.delete("http://localhost:3000/api/notes/" + noteId)
    .then((res) => {
      console.log(res.data.message)
      fetchNotes();
    });
  };







  const handleUpdate = (note) => {
          
    setForm({
      ...form,
      description: note.description,
    });

   setNoteId(note._id);

  };




  useEffect(() => {
    fetchNotes();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };



  return (
    <div className="main">
      <div className="form">
        <h2>NOTES</h2>

        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Enter title"
            value={form.title}
            onChange={(e) => handleChange(e)}
          />

          <input
            type="text"
            name="description"
            placeholder="Enter description"
            value={form.description}
            onChange={(e) => handleChange(e)}
          />

          <button>Create</button>
          <button onClick={()=>setUpdatebtn(true)}>Update</button>
         
        </form>
       
      </div>

      <div className="notes">
        {notes.map((note) => {
          return (
            <div className="note">
              <h3>{note.title}</h3>
              <p>{note.description}</p>

              <div className="btns">
                <button onClick={() => handleDelete(note._id)}>trash</button>
                <button onClick={() => handleUpdate(note)}>update</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
