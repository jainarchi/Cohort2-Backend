import '../style/createPost.scss'
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {
    const navigate = useNavigate()
  return (
    <div>
        <main>
            <div className='createPostCont'>

            <div className='upper'>
              <button onClick={() =>navigate(-1)}>Discard</button>
              <h4>Create Post</h4>
              <button>Post</button>

            </div>

            <div className='lower'>
             <input type="file" name='mediaInput' placeholder='addFile'/>

            <label htmlFor='mediaInput' className="mediaLabel">

                <div>
                   <p>Drag and drop or click to browser</p>
                    <button className=' button primaryButton'>Select Media</button>
                </div>
            </label>

             <div className="caption">
                  <textarea name="caption" placeholder='Description' id=""></textarea>
            </div>

            </div>


            </div>
        </main>
      
    </div>
  )
}

export default CreatePost
