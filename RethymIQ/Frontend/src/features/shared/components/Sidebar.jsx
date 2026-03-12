import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  RiHome4Line, 
  RiMusic2Line, 
  RiHeart3Line, 
  RiSparkling2Line, 
  RiUser3Line, 
  RiLoginBoxLine, 
  RiUserAddLine, 
  RiLogoutCircleLine,
  RiPulseFill
} from '@remixicon/react';
import '../styles/layout.scss'

const Sidebar = () => {
  return (
    <div className="sidebar">

      <div className="logo-container">
        <RiPulseFill size={32} color="#00f2ff" />
        <h2>Rhythm IQ</h2>
      </div>



      <nav className="nav-menu">
        <ul className="primary-nav">
          <li>
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              <RiHome4Line size={20} /> <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/latest-songs" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              <RiMusic2Line size={20} /> <span>What’s New</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/favorites" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              <RiHeart3Line size={20} /> <span>Favorites</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/mood" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              <RiSparkling2Line size={20} /> <span>Expression Detect</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              <RiUser3Line size={20} /> <span>Profile</span>
            </NavLink>
          </li>
        </ul>


        <ul className="auth-nav">
          <li>
            <NavLink to="/login" className="nav-link">
              <RiLoginBoxLine size={20} /> <span>Login</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/register" className="nav-link">
              <RiUserAddLine size={20} /> <span>Register</span>
            </NavLink>
          </li>
          <li className="nav-link logout-btn">
            <RiLogoutCircleLine size={20} /> <span>Logout</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;