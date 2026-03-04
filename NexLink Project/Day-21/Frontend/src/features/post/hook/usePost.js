import { useContext } from "react";
import { PostContext } from "../postContext";
import { getFeed , createPost , likePost , unlikePost } from "../services/post.api";
import { useEffect } from "react";

export const usePost = () =>{

 const {loading , setLoading , setFeed , feed , post , setPost} = useContext(PostContext)
  

 async function handleGetFeed(){

    setLoading(true)

     const data = await getFeed();
     setFeed(data.allPosts)
     console.log(data.allPosts)

     setLoading(false)
 }



 async function handleCreatePost(ImageFile , caption) {
    setLoading(true)

    const data = await createPost(ImageFile , caption)
    setFeed([data.post , ...feed])

    setLoading(false)
 }


  async function handleLikePost(postId) {
    await likePost(postId)
  }
 
  async function handleUnlikePost(postId) {
    await unlikePost(postId) 
  }



 // hydrate
  useEffect(() => {
    handleGetFeed();
   
  }, [])
  


  return{
    feed ,
    post,
    loading,
    handleGetFeed,
    handleCreatePost,
    handleLikePost,
    handleUnlikePost
  }



}