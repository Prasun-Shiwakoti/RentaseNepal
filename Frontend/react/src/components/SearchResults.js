import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import HostelCard from './HostelCard';
import allHostels from '../data/hostels.json';

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const locationQuery = queryParams.get('location') || '';
  const instituteQuery = queryParams.get('institute') || '';

  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [gender, setGender] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('price');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filteredHostels, setFilteredHostels] = useState([]);
  
  const priceSliderRef = useRef(null);
  const sliderInstanceRef = useRef(null);

  // Initialize the slider
  useEffect(() => {
    if (priceSliderRef.current && !sliderInstanceRef.current) {
      sliderInstanceRef.current = noUiSlider.create(priceSliderRef.current, {
        start: priceRange,
        connect: true,
        range: {
          min: 0,
          max: 10000,
        },
        step: 50,
        tooltips: [true, true],
        format: {
          to: (value) => Math.round(value),
          from: (value) => Number(value),
        },
      });

      // Add event listener
      sliderInstanceRef.current.on('change', (values) => {
        setPriceRange([parseInt(values[0]), parseInt(values[1])]);
      });
    }

    return () => {
      if (sliderInstanceRef.current) {
        sliderInstanceRef.current.destroy();
        sliderInstanceRef.current = null;
      }
    };
  },[]); // Empty dependency array since we only want to initialize once

  // Update slider values when priceRange changes from outside the slider
  useEffect(() => {
    if (sliderInstanceRef.current) {
      const currentValues = sliderInstanceRef.current.get();
      const newValues = priceRange.map(String);
      
      // Only update if values are different to prevent loops
      if (currentValues[0] !== newValues[0] || currentValues[1] !== newValues[1]) {
        sliderInstanceRef.current.set(newValues);
      }
    }
  }, [priceRange]);

  // Memoized filter and sort function
  const filterAndSortHostels = useCallback(() => {
    let result = allHostels.filter((hostel) => {
      const matchesLocation = locationQuery
        ? hostel.location.toLowerCase().includes(locationQuery.toLowerCase())
        : true;
      const matchesInstitute = instituteQuery
        ? hostel.nearbyInstitutes.some((instituteId) =>
            instituteId.toString().includes(instituteQuery.toLowerCase())
          )
        : true;
      const matchesPrice = hostel.price >= priceRange[0] && hostel.price <= priceRange[1];
      const matchesGender = gender ? hostel.gender.toLowerCase() === gender.toLowerCase() : true;
      const matchesRating = hostel.rating >= minRating;
      return matchesLocation && matchesInstitute && matchesPrice && matchesGender && matchesRating;
    });

    result = result.sort((a, b) => {
      if (sortBy === 'price') {
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
      }
      return sortOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating;
    });

    return result;
  }, [locationQuery, instituteQuery, priceRange, gender, minRating, sortBy, sortOrder]);

  // Apply filters when dependencies change
  useEffect(() => {
    setFilteredHostels(filterAndSortHostels());
  }, [filterAndSortHostels]);

  const resetFilters = () => {
    setPriceRange([0, 10000]);
    setGender('');
    setMinRating(0);
    setSortBy('price');
    setSortOrder('asc');
  };

  return (
    <>
    <div className="search-results">
      <div className="filters">
        <div className="filter-section">

          
          <h2>Filters <i className="bi bi-funnel-fill"/></h2>

          <div className="filter-option">
            <label>Price: Rs. {priceRange[0]} - Rs. {priceRange[1]}</label>
            <div ref={priceSliderRef} style={{ marginBottom: '10px', marginTop: '50px' }}></div>
          </div>

          <div className="filter-option">
            <label>Gender:</label>
            <select onChange={(e) => setGender(e.target.value)} value={gender}>
              <option value="">All</option>
              <option value="Boys">Boys</option>
              <option value="Girls">Girls</option>
              {/* <option value="Co-ed">Co-ed</option> */}
            </select>
          </div>

          <div className="filter-option">
            <label>Minimum Rating:</label>
            <select onChange={(e) => setMinRating(Number(e.target.value))} value={minRating}>
              <option value={0}>All</option>
              <option value={2}>2+</option>
              <option value={3}>3+</option>
              <option value={4}>4+</option>
              <option value={4.5}>4.5+</option>
            </select>
          </div>
        </div>

        <div className="sort-section">
          <label>Sort By</label>
          <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
          </select>

          <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        <button onClick={resetFilters} className="reset-filters">Reset Filters</button>
      </div>

      <div className="hostel-grid">
        {filteredHostels.length > 0 ? (
          filteredHostels.map((hostel) => (
            <HostelCard
              key={hostel.id}
              image={hostel.image}
              name={hostel.title}
              isFeatured={hostel.isFeatured}
              rating={hostel.rating}
              location={hostel.location}
              price={hostel.price}
              gender={hostel.gender}
            />
          ))
        ) : (
          <p>No hostels found based on your search criteria.</p>
        )}
      </div>
    </div>
    </>
  );
};

export default SearchResults;