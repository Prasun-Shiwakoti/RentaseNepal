import React from 'react';
import Nav from './Nav';
import '../style.css';
const Header = () => {
  return (
    <header>
      <Nav />
      <div className="upper-home">
        <div className="upperhome-box">
          <h1>Rentase</h1>
          <p>find your idea accomadation <br /> Hostels of your choice</p>
        </div>
        <div className="search_bar">
          <form action="" className="home-search">
            <i className="bi bi-geo-alt-fill"></i>
            <input type="search" placeholder="Search by location..." className="home-search-input" />
            <button className="button">search</button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
