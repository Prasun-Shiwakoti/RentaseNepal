import React from 'react';
import '../style.css';

const Footer = () => {
  return (
    <>
    <div className="footer">

      <div className="footer-section">
        <div className="image"><img src="img/logo.png" alt="" /></div>

        <p>Lorem ipsum dolor sit amet consectetur. Non bibendum sit non congue pharetra pulvinar leo. Sed ut amet
          ipsum.</p>
      </div>

      <div className="footer-section">
        <h3>Quick link</h3>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Buy</a></li>
          <li><a href="#">Sell</a></li>
          <li><a href="#">Rent</a></li>
        </ul>
      </div>

      <div className="footer-section">
        <h3>Support</h3>
        <ul>
          <li><a href="#">About us</a></li>
          <li><a href="#">Contact us</a></li>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms & Conditions</a></li>
        </ul>
      </div>

      <div className="footer-section">
        <h3>Get in touch</h3>
        <p className="contact-info">
          rentasenepal@gmail.com<br />
          Baneshwor, Kathmandu, Nepal <br />
          Phone: +977980000000
        </p>
        <div className="social-icons">
          <a href="https://www.facebook.com/people/Rentase-Nepal/61559722175314/"><i className="bi bi-facebook"/></a>
          <a href="https://www.facebook.com/groups/1007483277562234/"><i className="bi bi-instagram"/></a>
          <a href="https://www.facebook.com/groups/1007483277562234/"><i className="bi bi-whatsapp"/></a>
          <a href="https://www.facebook.com/groups/1007483277562234/"><i className="bi bi-envelope"/></a>
        </div>
      </div>


    </div>
    <div className="small-footer">
      <div className="center">

        <p> Copyright &copy; www.rentasenepal.com. All rights reserved</p>
      </div>
    </div>
    </>
  );
};

export default Footer;
