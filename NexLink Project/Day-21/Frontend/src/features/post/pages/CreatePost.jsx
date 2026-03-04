import '../style/createPost.scss'
import { useNavigate } from 'react-router-dom'
import { useState , useRef } from 'react'
import {usePost} from '../hook/usePost'

const CreatePost = () => {
    const navigate = useNavigate()
    const {handleCreatePost} = usePost()


    const [caption, setCaption] = useState('')
    const [preview, setPreview] = useState(null);
    const postImageInputFileRef = useRef(null)


    const handlePostSubmit = async () =>{
        
        const Imagefile = postImageInputFileRef.current.files[0]
        
        await handleCreatePost(Imagefile , caption)

        navigate('/')

    }
    
    const handleImageChange = (e) =>{
       const file = e.target.files[0];

       if(file){
        const imageURL = URL.createObjectURL(file)
        setPreview(imageURL)
       }
    }



  return (
    <div>
        <main>
            <div className='createPostCont'>

            <div className='upper'>
              <button onClick={() =>navigate(-1)}>Discard</button>
              <h4>Create Post</h4>
              <button onClick={handlePostSubmit} >Post</button>

            </div>

            <div className='lower'>
             <input 
              ref={postImageInputFileRef} 
              type="file" 
              id='mediaInput' 
              onChange={handleImageChange}
              className='imgInput'
             />

             <label htmlFor='mediaInput' className="mediaLabel">

              {
                preview ? (
                  <img 
                  src={preview} 
                  alt="postImage"
                 
                  
                  />

                ):(
                  <>
                   <h4>Upload Media</h4>
                   <p>Drag and drop or click to browser</p>
                   <span className='primaryButton'>Select</span>                  
                  </>
                )
              }
               
             </label>

             <div className="caption">
                  <textarea 
                   name="caption" 
                   value={caption}
                   onChange={(e) => setCaption(e.target.value)}
                   placeholder='Description'
                   ></textarea>
             </div>

            </div>


            </div>
        </main>
      
    </div>
  )
}

export default CreatePost
