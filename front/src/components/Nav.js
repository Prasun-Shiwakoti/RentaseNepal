import React from 'react';
import '../style.css';

const Nav = () => {
  return (
    <nav className="navBar">
      <h4>
        <div className="image"><img src="img/logo.png" alt="" /></div>
      </h4>
      <div className="nav-list">
        <ul>

          <li><a href="#">Home</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">Contact Us</a></li>
          <li><a  href="#"><i className="bi bi-globe"></i>Language</a></li>
          <li><a href="#">List Your Properties</a></li>

          <div className="login_section">

            <li> <a href="#">Log in</a></li>

            <i className="bi bi-person"></i>
          </div>

        </ul>
      </div>
    </nav >
  );
};

export default Nav;
