import React from "react";
import { Link, Outlet , NavLink } from "react-router-dom";
import HomeCard from "../components/HomeCard";
import "../style/home.scss";



const Home = () => (
  <div className="home-page">
    <HomeCard />

    <div className="content">
      <div className="selectionBar">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "choice active" : "choice")}
        >
          Songs
        </NavLink>

        <NavLink
          to="/recent"
          className={({ isActive }) => (isActive ? "choice active" : "choice")}
        >
          Recent Play
        </NavLink>
      </div>

      <div className="outlet-container">

        <Outlet />

      </div>

       
    </div>
  </div>
);

export default Home;
