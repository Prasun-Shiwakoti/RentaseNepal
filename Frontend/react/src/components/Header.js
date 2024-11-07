import React from 'react';
import Nav from './Nav';
import SearchBar from './SearchBar';
import '../style.css';
const Header = ({ blogRef, contactRef, serviceRef }) => {
  return (
    <header className="header-section">
      <Nav 
        blogRef={blogRef}
        contactRef={contactRef}
        serviceRef={serviceRef}
        isHome={true}
      />
      <div className="upper-home">
        <div className="upperhome-box">
          <h1>Rentase</h1>
          <p>find your ideal accomodation <br /> Hostels of your choice</p>
        </div>
        <div className="search_bar">
          <SearchBar/>
        </div>
      </div>
    </header>
  );
};

export default Header;
