import React from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import TopCities from './components/TopCities';
import FeaturedHostels from './components/FeaturedHostels';
import Footer from './components/Footer';
import './style.css';

const App = () => {
  return (
    <div className="app">
      <Header />
      <SearchBar />
      <TopCities />
      <FeaturedHostels />
      <Footer />
    </div>
  );
};

document.querySelectorAll('.hidden-row').forEach(row => row.style.display = 'none');

export default App;
