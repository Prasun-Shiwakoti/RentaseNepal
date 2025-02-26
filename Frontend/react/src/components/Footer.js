import React from 'react';
import '../style.css';

const Footer = () => {
  return (

    
    <>

    <div className="footer">

      <div className="footer-section">
        <div className="image"><img src="img/logo.png" alt="" /></div>

        <p>Making It Simple</p>
        <p>find your ideal accomodation</p>
        <p>Hostels of your choice</p>
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
          <li><a href="https://wa.me/9779763271690" target="_blank">Contact us</a></li>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms & Conditions</a></li>
        </ul>
      </div>

      <div className="footer-section">
        <h3>Get in touch</h3>
        <p className="contact-info">
          rentasenepal@gmail.com<br />
          Baneshwor, Kathmandu, Nepal <br />
          Phone: +977-9763271690
        </p>
        <div className="social-icons">
          <a href="https://www.facebook.com/people/Rentase-Nepal/61559722175314/" target="_blank"><i className="bi bi-facebook"/></a>
          <a href="https://www.instagram.com/rentase_nepal/" target="_blank"><i className="bi bi-instagram"/></a>
          <a href="https://wa.me/9779763271690" target="_blank"><i className="bi bi-whatsapp"/></a>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=rentasenepal@gmail.com" target="_blank"><i class="bi bi-envelope"></i></a>

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
