import React from 'react';
import '../style.css';

const Nav = () => {
  return (
    <nav>
      <h4>
        <div className="image"><img src="img/logo.png" alt="" /></div>
      </h4>
      <div className="right_bx">
        <ul>
          <li><a href="#">Properties</a></li>
          <li><a href="#">Contact us</a></li>
          <li><a href="#"><i className="bi bi-globe"></i>Language</a></li>
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
