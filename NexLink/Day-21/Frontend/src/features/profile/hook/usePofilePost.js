import { useContext } from "react";
import { ProfileContext } from "../profileContext";
import { getPosts , getPostDetails , editPost } from "../services/profilePost.api";

export const useProfilePost = () =>{
   const {loading , setLoading , user , setUserPosts , userPosts , setPostDetails , postDetails} = useContext(ProfileContext)



   const handleGetPosts = async () =>{
     setLoading(true)
     const data = await getPosts()
     setUserPosts(data)
     console.log(data)

     setLoading(false) 
   }


   const handleGetPostDetails = async (postId) =>{
    setLoading(true)
    const data = await getPostDetails(postId)
    setPostDetails(data)
    console.log(data)

    setLoading(false)
   }

   const handleEditPost = async (postId) =>{
    setLoading(true)
    const data = await editPost(postId)
    console.log(data)
    setLoading(false)

   }



    return{
        handleEditPost,
        handleGetPostDetails,
        handleGetPosts,
        loading,
        user,
        userPosts

    }
}