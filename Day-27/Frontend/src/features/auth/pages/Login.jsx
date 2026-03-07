import { useState } from "react"
import FormGroup from "../components/FormGroup"
import { Link } from "react-router-dom"
import "../style/authform.scss"



const Login = () => {

  const [form, setForm] = useState({
    username :"",
    email:"",
    password :""
  })

   const handleSubmit = () =>{

   }


   const handleChange = (e) =>{
      setForm({...form , [e.target.name] : e.target.value})
      console.log(e.target.value)
   }


  return (
    <main>
        <div className="form-Container">
            
            <div className="form-head">
              <h2>Rhythm IQ </h2>
               <p>Intelligent music for the soul.</p>
            </div>
        

        <form onSubmit={handleSubmit}>
           <FormGroup 
            label='Username'
            type='text' 
            name='username'
            value={form.username} 
            onChange={handleChange}  />

           <FormGroup 
           label='Email'
           type='email'
           name='email'
           value={form.email}
           onChange={handleChange}
             />

           <FormGroup 
           label='Password'
           type='password'
           name='password'
           value={form.password}
           onChange={handleChange}
             />

           <button className="button">Login</button>

        </form>


        <p className="continueWith">OR LOGN IN WITH</p>

        <button className="goggleButton button">Google</button>

        <p>Don't have any account? <Link to='/register'>Create One.</Link></p>



        </div>
      
    </main>
    
  )
}
 
export default Login
