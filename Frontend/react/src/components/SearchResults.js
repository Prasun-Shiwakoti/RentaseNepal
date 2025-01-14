import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import HostelCard from './HostelCard';

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const locationQuery = queryParams.get('location') || '';
  const lat = queryParams.get('lat') || '';
  const lon = queryParams.get('lon') || '';

  const [priceRange, setPriceRange] = useState([0, 15000]);
  const [gender, setGender] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('price');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filteredHostels, setFilteredHostels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
          max: 15000,
        },
        step: 500,
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

  const fetchFilteredHostels = async () => {
    setLoading(true);
    setError(null);

    const payload = {
      gender: gender, // 0: Female, 1: Male, 2: Any
      max_price: priceRange[1],
      min_price: priceRange[0],
      location: locationQuery,
      distance: {
        latitude: parseFloat(lat),
        longitude: parseFloat(lon)
      }
      // Additional filters can be added as required
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/hostels/filter/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error('Failed to fetch hostels. Please try again.');
      }

      const data = await response.json();
      setFilteredHostels(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilteredHostels();
  }, [priceRange, gender, locationQuery, lat, lon]);


  // Memoized filter and sort function
  const filterAndSortHostels = useCallback(() => {
    let result = filteredHostels.filter((hostel) => {
      return hostel.rating >= minRating;
    });

    result = result.sort((a, b) => {
      if (sortBy === 'price') {
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
      }
      return sortOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating;
    });

    return result;
  }, [minRating, sortBy, sortOrder]);

  // Apply filters when dependencies change
  useEffect(() => {
    setFilteredHostels(filterAndSortHostels());
  }, [filterAndSortHostels]);

  const resetFilters = () => {
    setPriceRange([0, 15000]);
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
              id={hostel.id}
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