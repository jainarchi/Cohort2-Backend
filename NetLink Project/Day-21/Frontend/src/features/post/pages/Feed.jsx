import {useEffect} from 'react'
import '../style/feed.scss'
import Post from '../components/Post'
import {usePost} from '../hook/usePost'

const Feed = () => {
    const {loading ,post , feed , handleGetFeed} = usePost()

    useEffect(() => {
      handleGetFeed()
     
    }, [])
    




   if(loading || ! feed){
       return <main>
        <h3>Feed is Loading...</h3>
       </main>
   }



  return (
    <div className='feedPage'>

      <div className="postContainer">
       
       {
        feed.map((post) =>{
          return  <Post key={post._id} post={post} user={post.user} />
        })
       }

       
       


      </div>

    </div>
  )
}

export default Feed
