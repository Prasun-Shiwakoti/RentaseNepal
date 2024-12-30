import React from 'react';
import '../style.css';
import { scrollToSection } from '../App.js';
import { Link } from 'react-router-dom';


const Nav = ({ blogRef, contactRef, serviceRef, isHome }) => {
  return (
    <nav className="navBar">
      <h4>
        <div className="image">
          <Link to="/">
            <img src="/img/logo.png" alt="Logo" />
          </Link>
        </div>
      </h4>
      <div className="nav-list">
        <ul>

          <li><a href="/">Home</a></li>

          {isHome &&
            <>
              <li onClick={() => scrollToSection(blogRef)}><a href="#">Blog</a></li>
              <li onClick={() => scrollToSection(serviceRef)}><a href="#">Services</a></li>
              <li onClick={() => scrollToSection(contactRef)}><a href="#">Contact</a></li>
            </>
          }
          {/* <li ><a  href="#"><i className="bi bi-globe"></i>Language</a></li> */}
          <li><a href="">List Your Properties</a></li>

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
