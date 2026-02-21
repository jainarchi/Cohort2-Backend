import {useState} from 'react'
import {Link , useNavigate} from 'react-router'
import '../style/form.scss'
import { useAuth } from '../hooks/useAuth'




const Register = () => {
  const navigate = useNavigate()
  const {loading , handleRegister} = useAuth()



    const [form, setForm] = useState({
        username : '',
        email : '',
        password : ''
    })

    const handleChange = (e) =>{
        setForm({...form , [e.target.name] : e.target.value})
    }



    const handleSubmit = async (e) =>{
      e.preventDefault();

      await handleRegister(form.username , form.email , form.password)

      navigate('/')
    }

  

    if(loading){
      return <main>
        <h1>Loading...</h1>
      </main>
    }



  return (
    <main>

      <div className='formContainer'>

        <h1>Register</h1>

        <form onSubmit={handleSubmit}>
            <input type="text"
              placeholder='Enter Username'
              value={form.username}
              onChange={handleChange}
              name='username'
            />
            <input type="email"
              placeholder='Enter Email'
              value={form.email}
              onChange={handleChange}
              name='email'
            />
            <input type="password"
              placeholder='Enter Password'
              value={form.password}
              onChange={handleChange}
              name='password'
            />

            <button className='button primary-button'>Register</button>
            <p>Already have an account? 
                <Link to='/login'> Login to account.</Link>
            </p>

        </form>
      
      </div>

    </main>
  )
}

export default Register
