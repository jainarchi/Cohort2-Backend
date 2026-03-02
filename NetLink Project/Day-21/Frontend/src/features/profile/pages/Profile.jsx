import "../style/profile.scss";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useProfile } from "../hook/useProfile";
import { useEffect } from "react";

const Profile = () => {
  const {loading , user , handleGetMe} = useProfile()

 
  useEffect(() => {
     handleGetMe()

  }, [])
  




  if(loading || !user){
    return (
      <main>
        Loading...
      </main>
    )
  }



  return (
    <div className="profilePage">
      <div className="head">

        <div className="first">
           <img className="profileImg" src={user.profileImage} alt="" />
        <h4>{user.username}</h4>
        <p>Lorem ipsum dolor sit.</p>
        <span>500 connections</span>

        </div>
       
     

      <div className="second">
        <NavLink
          to="/profile/work"
          className={({ isActive }) =>
            isActive ? "profile-btn active" : "profile-btn"
          }
        >
          Work
        </NavLink>

        <NavLink
          to="/profile/about"
          className={({ isActive }) =>
            isActive ? "profile-btn active" : "profile-btn"
          }
        >
          About
        </NavLink>
      </div>


       </div>

      <div className="content">
          <Outlet />
      </div>
    </div>
  );
};

export default Profile;
