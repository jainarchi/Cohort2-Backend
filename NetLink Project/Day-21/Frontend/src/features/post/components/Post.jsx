import React from 'react'


const Post = ({post , user}) => {
    

  return (
    <div className="post">
        
        <div className='upper'>

          <div className='user'>
           <img src={user.profileImage} alt="profileImg" />
          </div>

          <div>
            <h4>
                {user.username}
            </h4>
            <p>bio</p>
          </div>

        </div>

        <div className="postImgCont">
             <img src={post.postUrl} alt="postImg" />
        </div>

        <div className="bottom">
            <div className='iconCont'>

              <div>
                <button>0</button>
                <button>1</button>
                <button>1</button>

              </div>
              <button>1</button>



            </div>

            <div>
              <p>{post.caption}</p>
            </div>

            <p>Created At</p>


        </div>

      </div>
  )
}

export default Post
