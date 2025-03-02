import React, { useState } from 'react';
import '../style.css';
import { scrollToSection } from '../App.js';
import { Link } from 'react-router-dom';

const Nav = ({ blogRef, contactRef, serviceRef, isHome, isLoggedIn, userRole }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    
    <nav className="navBar">   
      <h4>
        <div className="image">
          <Link to="/">
            <img src="/img/logo.png" alt="Logo" />
          </Link>
        </div>
      </h4>
      <div className={`nav-list ${isMenuOpen ? 'active' : ''}`}>
        <ul>
          <li><Link to="/">Home</Link></li>

          {isHome &&
            <>
              <li onClick={() => scrollToSection(blogRef)}><a href="#">Blog</a></li>
              <li onClick={() => scrollToSection(serviceRef)}><a href="#">Services</a></li>
              <li onClick={() => scrollToSection(contactRef)}><a href="#">Contact</a></li>
            </>
          }
          {(userRole === 'renter' || userRole === 'admin') && <li className="list-hostel"><Link to="/list-your-hostel">List Your Hostel</Link></li>}

          <div className="login_section">
            {!isLoggedIn ? (
              <li><Link to="/login">Log In</Link></li>
            ) : (
              <li><Link to={userRole === 'admin' ? '/admin' : '/user'}><i className="bi bi-person"></i></Link></li>
            )}
          </div>
        </ul>
      </div>
      <button style={{ background: "none" , flex:"none"}} className="hamburger" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
    </nav>
  );
};

export default Nav;
