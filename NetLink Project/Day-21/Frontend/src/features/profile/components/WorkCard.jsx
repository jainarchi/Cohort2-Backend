import { RiBarChartLine, RiChat1Line, RiThumbUpLine } from "@remixicon/react";

const WorkCard = ({user , userPost , handleUnlikePost , handleLikePost}) => {

  const toggleLike = async (e , postId) =>{
    e.target.classList.toggle('like')

    if(e.target.classList.contains("like")){
       await handleUnlikePost(postId)
    }
    else{
        await handleLikePost(postId)
    }
  }








  return (
    <div className="post">
      <div className="upper">
        <div className="user">
          <img src={user.profileImage} alt="profileImg" />
        </div>

        <div>
          <h4>{user.username}</h4>
          <p>bio</p>
        </div>
      </div>

      <div className="postImgCont">
        <img src={userPost.postUrl} alt="postImg" />
      </div>

      <div className="bottom">
        <div className="iconCont">
          <div>
            <button
              onClick={(e) => toggleLike(e, userPost._id)}
              className={userPost.isLiked ? "like" : ""}
            >
              <RiThumbUpLine />
            </button>
            <button>
              <RiChat1Line />
            </button>
          </div>

          <button>
            <RiBarChartLine />
          </button>
        </div>

        <div>
          <p>{userPost.caption}</p>
        </div>

        <p>Created At</p>
      </div>
    </div>
  );
};

export default WorkCard;
