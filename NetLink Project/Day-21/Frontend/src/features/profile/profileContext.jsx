import { createContext, useState } from "react";


export const ProfileContext = createContext()


export const ProfileProvider = ({children}) =>{
    const [user, setUser] = useState(null)
    const [userPosts, setUserPosts] = useState(null)
    const [about, setAbout] = useState(null)
    const [loading, setLoading] = useState(false)
    const [postDetail , setPostDetail] = useState(null)
  

    return (
        <ProfileContext.Provider value={{user , setUser , userPosts , setUserPosts , about , setAbout , loading , setLoading}}>

            {children}

        </ProfileContext.Provider>
    )
}