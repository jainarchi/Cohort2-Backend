import { useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { register, login, getMe, logout } from "../services/auth.api";

export const useAuth = () => {
  const { loading, setLoading, user, setUser } = useContext(AuthContext);



  async function handleRegister({ username, email, password }) {
    setLoading(true);
    const data = await register(username, email, password);
    setUser(data.user);
    setLoading(false);
  }



  async function handleLogin({ username, email, password }) {
    setLoading(true);
    const data = await login(username, email, password);
    setUser(data.user);
    console.log(data.message);
    setLoading(false);
  }



  async function handleGetMe() {
    setLoading(true);
    const data = await getMe();
    setUser(data.user);
    console.log(data.message);
    setLoading(false);
  }



  async function handleLogout() {
    const data = await logout();
    console.log(data.message);
  }



  useEffect(() => {
    handleGetMe();
  }, []);


  return {
    handleRegister,
    handleGetMe,
    handleLogin,
    handleLogout,
    user,
    loading,
  };
};
