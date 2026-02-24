import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../style/form.scss'
import { useAuth } from "../hooks/useAuth";


const Register = () => {

  const {loading , handleRegister} = useAuth()

  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleRegister(form.username , form.email , form.password);

    navigate("/");
  };


  

  if(loading){
    return <main>
        <h2>Loading...</h2>
    </main>
  }

  return (
    <main>

    <div className="formContainer">

    <div className="head">
      <h2>Create Account</h2>
      <p>Sign up to start connecting with your community today.</p>
    </div>
      <form onSubmit={handleSubmit}>
        <div>
          <h4>Username</h4>
          <input
            type="text"
            placeholder="John Doe"
            value={form.username}
            name="username"
            required={true}
            onChange={handleChange}
          />
        </div>
        <div>
          <h4>Email Address</h4>
          <input
            type="email"
            placeholder="email"
            name="email"
            value={form.email}
            required={true}
            onChange={handleChange}
          />
        </div>

        <div>
          <h4>Password</h4>
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            value={form.password}
            required={true}
            onChange={handleChange}
          />
        </div>
        <div>
          <h4>Confirm Passwod</h4>
          <input
            type="password"
            placeholder="Re-enter your password"
            name="confirmPassword"
            value={form.confirmPassword}
            required={true}
            onChange={handleChange}
          />
        </div>

        <button
         className="primaryButton button"
        >Create Account
        </button>

      </form>

      <section>


        <div className="contWith">
          <span > Or Continue with</span>
        </div>

          <button
         className="button"
          >Google
        </button>


         <p>
          Already have an account?
          <Link to="/login"> Log in.</Link>
        </p>


        </section>





      </div>
    </main>
  );
};

export default Register;
