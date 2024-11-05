import React, { useState } from 'react';
import '../style.css';

const SearchBar = () => {
  // const [location, setLocation] = useState('');

  // const handleSearch = () => {
  //   // Handle the search functionality
  //   console.log('Searching for:', location);
  // };

  return (
    <div className="search_bar">
      <form action="" className="home-search">
        <i className="bi bi-geo-alt-fill"></i>
        <input type="search" placeholder="Search by location..." className="home-search-input" />

        <select className="filter-select" name="gender">
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <select className="filter-select" name="institute">
          <option value="">Select Nearby Institute</option>
          <option value="institute1">Institute 1</option>
          <option value="institute2">Institute 2</option>
          <option value="institute3">Institute 3</option>
        </select>

        <button className="button">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
