import {useEffect} from 'react'
import '../../style/feed.scss'
import Post from '../Post'
import {usePost} from '../../hook/usePost'


const Feed = () => {
    const {loading ,post , feed , handleGetFeed , handleLikePost , handleUnlikePost} = usePost()

    useEffect(() => {
      handleGetFeed()
     
    }, [])
    

   if(loading || ! feed){
       return <main>
        <h3>Feed is Loading...</h3>
      {  console.log(feed)}
       </main>
   }



  return (

      <div className="feedContainer">
       
       {
        feed.map((post) =>{
          return  <Post 
          key={post._id} 
          post={post} 
          user={post.user} 
          handleLikePost={handleLikePost}
          handleUnlikePost={handleUnlikePost} 
          />
        })
       }

       
       


      </div>


  )
}

export default Feed
