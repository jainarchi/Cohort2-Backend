import { Link , useNavigate } from 'react-router'
import {useState} from 'react'
import '../style/form.scss'
import {useAuth} from '../hooks/useAuth'



const Login = () => {

    const navigate = useNavigate();
    const { loading , handleLogin} = useAuth()

   
    const [form, setForm] = useState({
        username : '',
        password : '',
    })


    const handleChange = (e) =>{
       setForm({...form , [e.target.name] : e.target.value })
    }

   
   const handleSubmit = async (e) =>{
    e.preventDefault();
   
    await handleLogin(form.username , form.password)

    navigate('/');
   }



   if(loading){
    return <main>
        <h1>Loading...</h1>
    </main>
   }

  return (
    <main>
       
       <div className="formContainer">

        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
            <input type="text" 
             placeholder='Enter Username'
             name='username'
             value={form.username}
             onChange={handleChange}
            
            />
              <input type="password" 
             placeholder='Enter Password'
             name='password'
             value={form.password}
             onChange={handleChange}
            
            />
            <button className='button primary-button'>Login</button>
            <p>You don't have an account?
                <Link to='/register'> Create One.</Link>
            </p>
        </form>


        </div>
      
    </main>
  )
}

export default Login
