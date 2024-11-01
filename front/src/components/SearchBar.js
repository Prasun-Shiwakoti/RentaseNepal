import React, { useState } from 'react';
import '../style.css';

const SearchBar = () => {
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    // Handle the search functionality
    console.log('Searching for:', location);
  };

  return (
    <div className="search-section">



      <div className="search-container">
        <h2>Find Your Ideal Hostel</h2>
        <div className="search-bar">
          <input type="text" placeholder="Enter location or address" />

          <select>
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="coed">Co-ed</option>
          </select>

          <input type="text" placeholder="Enter nearby instiitutes " />


          <select>
            <option value="">Price Range</option>
            <option value="low">Under $500</option>
            <option value="mid">$500 - $1000</option>
            <option value="high">Above $1000</option>
          </select>

          <button>Search Hostels</button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
