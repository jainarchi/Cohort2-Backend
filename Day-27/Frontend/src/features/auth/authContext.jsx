import { createContext , useState } from "react";

export const AuthContext = createContext()


export const AuthProvider = ({children}) =>{
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)
    const [showPassword, setShowPassword] = useState(false)


    return (
        <AuthContext.Provider 
         value={{loading , setLoading , user , setUser , showPassword , setShowPassword}}>

            {children}

        </AuthContext.Provider>

    )
}