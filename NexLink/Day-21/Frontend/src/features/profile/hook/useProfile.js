import { useContext } from "react";
import { ProfileContext } from "../profileContext";

import {getMe} from "../services/profile.api"


export const useProfile = () =>{

    const {loading, setLoading, user , setUser , about , setAbout } = useContext(ProfileContext)

    const handleGetMe= async () =>{
        setLoading(true)
        const data = await getMe();
        setUser(data)
        setLoading(false)
    }


    




    return {
        loading,
        user,
        handleGetMe
        
    }

}