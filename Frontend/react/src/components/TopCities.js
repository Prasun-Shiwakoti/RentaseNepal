import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CityCard from './CityCard';
import topCitiesData from '../data/topcities.json';

const TopCities = () => {
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  const toggleCityRows = () => {
    setShowAll(!showAll);
  };

  const goToDetails = (city) => {
    console.log(`Navigating to details of ${city}`);
    navigate(`/search-results?location=${city}`);
  };

  return (
    <div className="topcities-section">
      <div className="topcities-container">
        <h2>Our Top Places</h2>
        <p>Choose The places You’ll Be Living In Next, Or Look For Flatmates And Rooms Near You</p>
        <div className="grid top-cities-grid">
          {topCitiesData
            .slice(0, showAll ? topCitiesData.length : 4)
            .map((city) => (
              <CityCard
                key={city.id}
                name={city.name}
                image={city.image}
                description={city.description}
                onClick={() => goToDetails(city.name)}
              />
            ))}
        </div>
        <button className="toggle-button" onClick={toggleCityRows}>
          {showAll ? 'Show Less' : 'Show More'}
        </button>
      </div>
    </div>
  );
};

export default TopCities;
