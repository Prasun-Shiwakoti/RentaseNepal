  import React, { useState, useEffect } from 'react';
  import { useNavigate } from 'react-router-dom';
  import Select from 'react-select';
  import '../style.css';
  import institutes from '../data/institutes.json'

  const SearchBar = () => {
    const [location, setLocation] = useState('');
    const [institute, setInstitute] = useState({ lat: 0, lon: 0 });
    const [isMobile, setIsMobile] = useState(window.innerWidth<600);
    const navigate = useNavigate();


    // Update isMobile state on resize
    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth < 600);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Function to handle search
    const handleSearchLocation = (e) => {
      e.preventDefault();
      // Redirect to the search results page with the query params
      if (location) {
        setInstitute({lat:0, lon:0});
        navigate(`/search-results?location=${location}`);
      }
      else {
        alert("Search Field Empty");
      }
    };
    const handleSearchInstitute = (e) => {
      e.preventDefault();

      // Redirect to the search results page with the query params
      if (institute.lat !== 0 || institute.lon !== 0) {
        setLocation('');
        navigate(`/search-results?lat=${institute.lat}&lon=${institute.lon}`);
      }
      else {
        alert("Search Field Empty");
      }
    };

    const searchStyles = {
      control: (provided, state) => ({
        ...provided,
        outline: "none",
        border: "none",
        borderRadius: "20px",
        // width: "280px",
        minWidth: "0",
        backgroundColor: "#fff",
        color: "hsl(228, 15%, 50%)",
        padding: "15px 20px",
        fontSize: "13px",
        boxShadow: state.isFocused ? "0 0 5px hsl(228, 66%, 53%)" : "none",
      }),
      menuList: (provided) => ({
        ...provided,
        maxHeight: "150px",
        overflowY: "auto",
        fontSize: "13px",
      }),

    }
    // const institutes = [
    //   { label: 'Tribhuvan University', value: { lat: 27.682, lon: 85.324 } },
    //   { label: 'Kathmandu University', value: { lat: 27.602, lon: 85.535 } },
    //   { label: 'Pulchowk Campus', value: { lat: 27.682, lon: 85.317 } },
    //   { label: 'Kantipur Engineering College', value: { lat: 27.641, lon: 85.293 } },
    //   { label: 'St. Xavier’s College', value: { lat: 27.706, lon: 85.327 } },
    //   { label: 'Nepal Engineering College', value: { lat: 27.682, lon: 85.314 } },
    //   { label: 'Thapathali Campus', value: { lat: 27.688, lon: 85.318 } },
    // ];
    return (
      <div className="search_bar_results">
        <form action="" className="home-search" onSubmit={handleSearchLocation}>
          <i className="bi bi-geo-alt-fill" />
          <input
            id="search_location"
            type="search"
            placeholder={isMobile ? "Location" : "Enter Location"} 
            className="home-search-input"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button type="submit" className="button">
            {isMobile ? <i className="bi bi-search"/> : 'Search'}
          </button>
        </form>
        <form action="" className="home-search" onSubmit={handleSearchInstitute}>
          <i className="bi bi-buildings-fill"></i>
          <Select
            placeholder="Nearby Institute"
            styles={searchStyles}
            options={institutes}
            value={institutes.find((option) => option.value.lat === institute.lat && option.value.lon === institute.lon) || null}
            onChange={(selectedOption) => setInstitute(selectedOption?.value)}
          />
          <button type="submit" className="button">
            {isMobile ? <i className="bi bi-search"/> : 'Search'}
          </button>
        </form>
      </div>
    );
  };

  export default SearchBar;
