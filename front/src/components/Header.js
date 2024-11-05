import React from 'react';
import Nav from './Nav';
import SearchBar from './SearchBar';
import '../style.css';
const Header = () => {
  return (
    <header className="header-section">
      <Nav />
      <div className="upper-home">
        <div className="upperhome-box">
          <h1>Rentase</h1>
          <p>find your ideal accomodation <br /> Hostels of your choice</p>
        </div>
        <SearchBar/>
      </div>
    </header>
  );
};

export default Header;
