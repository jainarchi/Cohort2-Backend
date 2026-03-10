import { useState } from "react"
import FormGroup from "../components/FormGroup"
import { Link } from "react-router-dom"
import "../style/authform.scss"
import {useAuth} from '../hook/useAuth'
import { useNavigate } from "react-router-dom"



const Register = () => {

  const{loading , handleRegister} = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    username :"",
    email:"",
    password :""
  })


   const handleSubmit = async (e) =>{
    e.preventDefault()

    await handleRegister({
     username : form.username,
     email: form.email,
     password: form.password
    })

    navigate('/')

   }


   const handleChange = (e) =>{
      setForm({...form , [e.target.name] : e.target.value})
   }


   if(loading){
    return (
      <main>
        <h2>loading...</h2>
      </main>
    )
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

           <button className="button">Create Account</button>

        </form>


        <p className="continueWith">OR SIGN UP WITH</p>

        <button className="goggleButton button">Google</button>

        <p>Already have an account? <Link to='/login'>Login.</Link></p>



        </div>
      
    </main>
    
  )
}
 
export default Register
