import {useState} from 'react'
import {Link , useNavigate} from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'


const Login = () => {
   const { loading , handleLogin} = useAuth()
   
    const navigate = useNavigate()

    const [form, setForm] = useState({
        usernameOrEmail: '',
        password : '',

    })

    const handleChange = (e) =>{
        setForm({... form , [e.target.name ] : e.target.value})
    }
    

    
    const handleSubmit = async (e) =>{
        e.preventDefault();

        await handleLogin(form.usernameOrEmail , form.password)

        navigate('/feed')
    }


    if(loading){
        return <main>
            <h2>Loading...</h2>
        </main>
    }

  return (
   <main>

    <div className="formContainer">

    <div className="head">
      <h2>Welcome Back</h2>
      <p>Connect with your world.</p>
    </div>
      <form onSubmit={handleSubmit}>
        <div>
          <h4>Username Or Email</h4>
          <input
            type="text"
            placeholder="John Doe"
            value={form.usernameOrEmail}
            name="usernameOrEmail"
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

          <span className='smallBlue'>Forget password ?</span>
        </div>

      
        <button
         className="primaryButton button"
        >Log In
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


         <p>Don't have an account?
          <Link to="/register"> Create One.</Link>
        </p>


        </section>





      </div>
    </main>

  )
}

export default Login
