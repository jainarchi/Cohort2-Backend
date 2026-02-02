import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);



  const fetchNotes = () => {
    axios.get("http://localhost:3000/api/notes").then((res) => {
      setNotes(res.data.notes);
      console.log(res.data.notes);
    });
  };



  const handleSubmit = (e) => {
    e.preventDefault();

    const { title, description } = e.target.elements;

    axios
      .post("http://localhost:3000/api/notes", {
        title: title.value,
        description: description.value,
      })
      .then(() => {
        fetchNotes();
      });

    title.value = "";
    description.value = "";
  };




  const handleDelete = (noteId) => {
    axios.delete("http://localhost:3000/api/notes/" + noteId).then(() => {
      fetchNotes();
    });
  };





  useEffect(() => {
    fetchNotes();
  }, []);





  return (
    <div className="main">
      <div className="form">
        <h2>NOTES</h2>

        <form action="" onSubmit={handleSubmit}>
          <input type="text" name="title" placeholder="Enter title" />
          <input
            type="text"
            name="description"
            placeholder="Enter description"
          />
          <button>Create</button>
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
                <button>update</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
