import axios from 'axios'
import {useState} from 'react'
import { Link } from 'react-router'
import '../styles/form.scss'


const Register = () => {

  const [form, setForm] = useState({
    username : '',
    email : '',
    password : ''
  })
  

  const handleChange = (e) =>{
    setForm({...form , [e.target.name] : e.target.value})
  }


  const handleSubmit = (e) =>{
    e.preventDefault()

    axios.post('http://localhost:3000/api/auth/register' , {
      username : form.username,
      email : form.email,
      password : form.password
    },{
      withCredentials : true 
    }
  ).then((res)=>{
    console.log(res.data.message)
  })
  .catch((err)=>{
    console.log(err.response.data.message)
  })

  }


  return (
    <div className='formContainer'>
      <form onSubmit={handleSubmit}>
        
        <input type="text"
        placeholder='Username'
        name='username'
        value={form.username}
        onChange={handleChange}
        required={true}

        />

        <input type="email"
        placeholder='Email'
        name='email'
        value={form.email}
        onChange={handleChange}
        required={true}
        
        />

        <input type="password"
        placeholder='Password'
        name='password'
        value={form.password}
        onChange={handleChange}
        required={true}

      
        />

        <button>Register</button>
        <p>Already have an account? 
            <Link className='toggleAuthForm' to="/login"> Login</Link>
        </p>



      </form>
      
    </div>
  )
}

export default Register
