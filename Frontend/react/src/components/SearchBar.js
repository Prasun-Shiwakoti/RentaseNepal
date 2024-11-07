import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style.css';

const SearchBar = () => {
  const [location, setLocation] = useState('');
  const [institute, setInstitute] = useState('');
  const navigate = useNavigate();

  // Function to handle search
  const handleSearch = (e) => {
    e.preventDefault();
    
    // Redirect to the search results page with the query params
    if(location || institute){
      navigate(`/search-results?location=${location}&institute=${institute}`);
    }
    else{
      const search_bar= document.getElementsByClassName("home-search")[0];
      search_bar.style.boxShadow = "0 10px 30px #ff0000";
      search_bar.style.border="4px solid #ff0000";
      alert("Search Field Empty");
    }
  };
  return (
      <form action="" className="home-search" onSubmit={handleSearch}>
        <i className="bi bi-geo-alt-fill"/>
        <input
            id="search_location"
            type="search"
            placeholder="Enter Location"
            className="home-search-input"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <i className="bi bi-buildings-fill"></i>
          <input
            id="search_institute"
            type="search"
            placeholder="Enter Nearby Institute"
            className="home-search-input"
            value={institute}
            onChange={(e) => setInstitute(e.target.value)}
          />

        <button type="submit" className="button">Search</button>
      </form>
  );
};

export default SearchBar;
