import { useEffect } from "react"
import { useProfilePost } from "../hook/usePofilePost"
import { usePost } from "../../post/hook/usePost"
import WorkCard from "./WorkCard"



const Work = () => {

  const {loading , user , userPosts , handle , handleEditPost,
        handleGetPostDetails, handleGetPosts,} = useProfilePost()

   const {handleLikePost, handleUnlikePost} = usePost()    

   useEffect(() => {
     handleGetPosts()

   }, [])


   if(loading || ! userPosts){
    return (
      <main>
        Loading...
      </main>
    )
   }
  
 
  return (
    <div className='workPage'>


     {
      userPosts.map((p) =>{
         <WorkCard 
         user={p.user} 
         userPost={p} 
         key={p._id} 
         handleLikePost={handleLikePost}
         handleUnlikePost={handleUnlikePost}
           />
      })
     }



       
    </div>
  )
}

export default Work
