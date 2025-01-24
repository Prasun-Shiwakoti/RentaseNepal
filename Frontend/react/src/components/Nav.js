import React from 'react';
import '../style.css';
import { scrollToSection } from '../App.js';
import { Link } from 'react-router-dom';


const Nav = ({ blogRef, contactRef, serviceRef, isHome, isLoggedIn, userRole }) => {
  console.log(isLoggedIn);
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

          <li><Link to="/">Home</Link></li>

          {isHome &&
            <>
              <li onClick={() => scrollToSection(blogRef)}><a href="#">Blog</a></li>
              <li onClick={() => scrollToSection(serviceRef)}><a href="#">Services</a></li>
              <li onClick={() => scrollToSection(contactRef)}><a href="#">Contact</a></li>
            </>
          }
          {/* <li ><a  href="#"><i className="bi bi-globe"></i>Language</a></li> */}
          {isLoggedIn && <li className="list-hostel"><Link to="/list-your-hostel">List Your Hostel</Link></li>}

          <div className="login_section">
            {!isLoggedIn ? (
              <li><Link to="/login">Log In</Link></li>
            ) : (
              <li><Link to={userRole === 'admin'? '/admin': '/user'}><i className="bi bi-person"></i></Link></li>
            )}
          </div>

        </ul>
      </div>
    </nav >
  );
};

export default Nav;
