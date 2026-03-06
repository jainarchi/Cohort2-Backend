import FormGroup from "../components/FormGroup"
import { Link } from "react-router-dom"
import "../style/register.scss"
const Register = () => {

   const handleSubmit = () =>{

   }


  return (
    <main>
        <div className="form-Container">
            
        <h2>Register</h2>

        <form onSubmit={handleSubmit}>
           <FormGroup label='Username'  />
           <FormGroup label='Email'  />
           <button className="button">Register</button>

          <p>Already have an account? <Link to='/login'>Login.</Link></p>

        </form>



        </div>
      
    </main>
    
  )
}

export default Register
