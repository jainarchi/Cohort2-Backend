import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
  });
  const [btn, setBtn] = useState("Create");
  const [noteId, setNoteId] = useState(null);

  const fetchNotes = () => {
    axios.get("http://localhost:3000/api/notes").then((res) => {
      setNotes(res.data.notes);
    });
  };

  const handleDelete = (noteId) => {
    axios.delete("http://localhost:3000/api/notes/" + noteId).then((res) => {
      console.log(res.data.message);
      fetchNotes();
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (btn == "Update") {
      axios
        .patch("http://localhost:3000/api/notes/" + noteId, {
          description: form.description,
        })
        .then((res) => {
          console.log(res.data.message);
          form.description = "";
          fetchNotes();
          setBtn("Create")
        });
    } else {
      axios
        .post("http://localhost:3000/api/notes", {
          title: form.title,
          description: form.description,
        })
        .then((res) => {
          console.log(res.data.message);
          fetchNotes();
          form.title = "";
          form.description = "";
        });
    }
  };

  const handleEdit = (note) => {
    setForm({ ...form, description: note.description });
    setBtn("Update");
    setNoteId(note._id);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Notes</h2>

      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
        />
        <button>{btn}</button>
      </form>

      <div className="notes">
        {notes.map((note) => (
          <div className="note">
            <h3>{note.title}</h3>
            <p>{note.description}</p>

            <div className="btns">
              <button onClick={() => handleDelete(note._id)}>Delete</button>
              <button onClick={() => handleEdit(note)}>Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
