import { createContext, useState } from "react";


export const SongContext = createContext()


export const SongContextProvider = ({children}) =>{
    const [songs, setSongs] = useState(null)
    const [loading, setLoading] = useState(false)
    const [favoriteSongs, setFavoriteSongs] = useState(null)
    const [latestSongs, setLatestSongs] = useState(null)
    const [recentPlay , setRecentPlay] = useState(null)
    const [moodSongs, setMoodSongs] = useState(null)


    return(
        <SongContext.Provider
         value={{songs , setSongs , loading , setLoading , favoriteSongs , setFavoriteSongs , latestSongs , setLatestSongs , recentPlay , setRecentPlay , moodSongs, setMoodSongs}} 
        >

            {children}
            
        </SongContext.Provider>
    )
}