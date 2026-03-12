import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { register, login, getMe , logout } from '../services/auth.service'

export const useAuth = () => {
    
  const { user, setUser, loading, setLoading } = useContext(AuthContext);



  const handleRegister = async ({ username, email, password }) => {
     setLoading(true);
     const data = await register(username, email, password);
     console.log(data);
     setUser(data.user);
     setLoading(false);
  }


  const handleLogin = async ({ username, email, password }) => {
     setLoading(true);
     const data = await login(username, email, password);
     console.log(data);
     setUser(data.user);
     setLoading(false);
  }


  const handleGetMe = async () => {
     setLoading(true);
     const data = await getMe();
     setUser(data.user);
     setLoading(false);
  }


  const handleLogout = async () =>{
    setLoading(true)
    const data = await logout()
    console.log(data.message)
    setLoading(false)
    
  }



  return {
    handleGetMe,
    handleRegister,
    handleLogin,
    handleLogout,
    user,
    loading
  }
};
