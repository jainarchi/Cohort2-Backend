import { useContext } from "react";
import { ProfileContext } from "../profileContext";
import { getPosts , getPostDetails , editPost } from "../services/profilePost.api";

const useProfilePost = () =>{
   const {loading , setLoading , user , setUserPosts , userPosts , setPostDetails , postDetails} = useContext(ProfileContext)



   const handleGetPosts = async () =>{
     setLoading(true)
     const data = await getPosts()
     setUserPosts(data)

     setLoading(false) 
   }


   const handleGetPostDetails = async (postId) =>{
    setLoading(true)
    const data = await getPostDetails(postId)
    setPostDetails(data)

    setLoading(false)
   }

   const handleEditPost = async (postId) =>{
    setLoading(true)
    const data = await editPost(postId)
    setLoading(false)

   }



    return{

    }
}