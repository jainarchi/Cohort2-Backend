import { RiBarChartLine, RiChat1Line, RiThumbUpLine } from "@remixicon/react";

const WorkCard = () => {
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
        <img src={post.postUrl} alt="postImg" />
      </div>

      <div className="bottom">
        <div className="iconCont">
          <div>
            <button
              onClick={(e) => toggleLike(e, post._id)}
              className={post.isLiked ? "like" : ""}
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
          <p>{post.caption}</p>
        </div>

        <p>Created At</p>
      </div>
    </div>
  );
};

export default WorkCard;
