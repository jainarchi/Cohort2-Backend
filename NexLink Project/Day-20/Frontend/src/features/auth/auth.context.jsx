import { useState, createContext } from "react";


export const AuthContext = createContext();


export const AuthProvider = ({children}) =>{

    const [user, setUser] = useState(null)
    const [loading, setlLoading] = useState(false)

    return(

        <AuthContext.Provider value={{user , setUser , loading , setlLoading}} >
            {children}
        </AuthContext.Provider>

    )
}