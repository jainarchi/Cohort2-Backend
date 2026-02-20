import { useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import '../styles/form.scss'

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const [error, setError] = useState("");


  
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const payload = {
      password: form.password,
    };
    if (form.username) payload.username = form.username;
    if (form.email) payload.email = form.email;

    axios
      .post(
        "http://localhost:3000/api/auth/login",
        payload,
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log(err.response.data.message)
        setError(err.response.data.message)
      });
  };






  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={form.username}
          onChange={handleChange}
         
        />
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required={true}
        />

        <button>Login</button>
        {error && <p className="errorMessage">{error}</p>}
        <p>Don't have an account? 
            <Link className='toggleAuthForm' to="/signup"> Register</Link>
        </p>



      </form>
    </div>
  );
};

export default Login;
