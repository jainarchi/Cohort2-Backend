import { createContext, useState } from "react";


export const ConnectionContext = createContext()


export const ConnectionProvider = ({children}) =>{
    const [loading, setLoading] = useState(false)
    const [incomingReq , setIncomingReq] = useState(null)
    const [sentReq, setSentReq] = useState(null)
    const [allConnections, setAllConnections] = useState(null)



    return(
       < ConnectionContext.Provider value={{loading , setLoading , setIncomingReq , incomingReq ,sentReq , setSentReq , setAllConnections , allConnections}}>
             {children}
       
       </ConnectionContext.Provider>
    )

}