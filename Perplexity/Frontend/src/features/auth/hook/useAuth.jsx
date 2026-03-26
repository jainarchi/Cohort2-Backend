import { useDispatch } from "react-redux";
import {register , login ,getMe} from '../services/auth.api'
import {setUser , setLoading , setError} from '../auth.slice'


export const useAuth =()=>{

    const dispatch = useDispatch()


    async function handleRegister({email , username , password}) {
        try{
            dispatch(setLoading(true))
            const data = await register({email , username , password})
            // msg  data.message - email sent 
        }
        catch(err){
            dispatch(setError(err.response?.data?.message || "Registration failed"))
        }
        finally{
            dispatch(setLoading(false))
        }   
    }



    async function handleLogin({email , password}) {
        try{
            dispatch(setLoading(true))
            const data = await login({email , password})
            dispatch(setUser(data.user))
            console.log(data.message)
        }
        catch(err){
            dispatch(setError(err.message?.data?.message || "login failed"))
        }
        finally{
            dispatch(setLoading(false))
        }
    }

    async function handleGetMe() {
        try{
            dispatch(setLoading(true))
            const data = await getMe()
            dispatch(setUser(data.user))
            console.log(data.user)
        }
        catch(err){
            dispatch(setError(err.response?.data?.message || "Failed to fetch user"))
        }
        finally{
            dispatch(setLoading(false))
        }
        
    }


   
    return {
        handleRegister,
        handleLogin,
        handleGetMe
    }




}