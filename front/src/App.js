import React from 'react';
import Header from './components/Header';
import TopCities from './components/TopCities';
import FeaturedHostels from './components/FeaturedHostels';
import Footer from './components/Footer';
import Blogs from './components/Blogs';
import Services from './components/Services';
import './style.css';

const App = () => {
  return (
    <div className="app">
      <Header />
      <FeaturedHostels />
      <TopCities />
      <Services />
      <Blogs />
      <Footer />
    </div>
  );
};

// document.querySelectorAll('.hidden-row').forEach(row => row.style.display = 'none');

export default App;
