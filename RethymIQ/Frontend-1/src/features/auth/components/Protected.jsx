import { useAuth } from '../hook/useAuth'
import { Navigate } from 'react-router-dom'

const Protected = ({children}) => {
    const {loading , user} = useAuth()

    if(loading){
        return <h2>loading...</h2>
    }

    // user get by hydrate 
    if(!user){
        return <Navigate to='/login' />
    }

    return children
}

export default Protected
