import { createContext, useState } from "react";


export const SongContext = createContext()


export const SongContextProvider = ({children}) =>{
    const [songs, setSongs] = useState(null)
    const [loading, setLoading] = useState(false)
    const [favoriteSongs, setFavoriteSongs] = useState(null)
    const [latestSongs, setLatestSongs] = useState(null)
    const [recentSongs , setRecentSongs] = useState(null)


    return(
        <SongContext.Provider
         value={{songs , setSongs , loading , setLoading , favoriteSongs , setFavoriteSongs , latestSongs , setLatestSongs , recentSongs , setRecentSongs}} 
        >

            {children}
        </SongContext.Provider>
    )
}