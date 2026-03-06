import {createBrowserRouter} from 'react-router-dom'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'


export const router = createBrowserRouter([
    {
        path: '/',
        element : <h2>Home page </h2>
    },
    {
        path : '/register',
        element : <Register />
    },
    {
        path: '/login',
        element : <Login />
    },
    
])

