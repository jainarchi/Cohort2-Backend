import { useContext } from "react";
import { PostContext } from "../postContext";
import { getFeed } from "../services/post.api";


export const usePost = () =>{

 const {loading , setLoading , setFeed , feed , post , setPost} = useContext(PostContext)


  

 async function handleGetFeed(){

    setLoading(true)

     const data = await getFeed();
     setFeed(data.allPosts)

     setLoading(false)
 }


return{
    feed ,
    post,
    loading,
    handleGetFeed
}



}