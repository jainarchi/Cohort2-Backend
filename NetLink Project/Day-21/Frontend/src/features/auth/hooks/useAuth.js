import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { register , login , getMe } from "../services/auth.api";



export const useAuth = () =>{
  
  const context = useContext(AuthContext)
  const {user , setUser , loading , setLoading } = context


  async function handleLogin(username , password) {
      setLoading(true)

      const response = await login(username , password)
      setUser(response)

      setLoading(false)

   }


  async function handleRegister(username , email , password) {
       setLoading(true)
       console.log('hooks')
       const response = await register(username , email , password)
       setUser(response)

       setLoading(false)
   }




  async function handleGetMe() {
    setLoading(true)
    
    const response = await getMe()
    setUser(response)

    setLoading(false)
   }



   return {
    user , 
    loading,
    handleLogin,
    handleRegister,
    handleGetMe
  }
   
}