import React, { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import TopCities from './components/TopCities';
import FeaturedHostels from './components/FeaturedHostels';
import Footer from './components/Footer';
import Blogs from './components/Blogs';
import Services from './components/Services';
import SearchResults from './components/SearchResults';
import Nav from './components/Nav';
import SearchBar from './components/SearchBar';
import './style.css';
import ScrollToTop from './components/ScrollToTop';

export const scrollToSection = (elementRef) => {
  window.scrollTo({
    top : elementRef.current.offsetTop,
    behavior : 'smooth'
  })
}

const App = () => {
  const blogRef = useRef(null);
  const contactRef = useRef(null);
  const serviceRef = useRef(null);
  return (
    <Router>
      <div className="app">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={
            <>
              <Header 
                blogRef={blogRef}
                contactRef={contactRef}
                serviceRef={serviceRef}
              />
              <FeaturedHostels />
              <TopCities />
              <div ref={serviceRef}>
                <Services />
              </div>
              <div ref={blogRef}>
                <Blogs />
              </div>
            </>
          } />
          <Route path="/search-results" element={
            <>
              <div>
                <Nav/>
                <div className="results-search-bar">
                  <SearchBar/>
                </div>
              </div>
              <SearchResults />
            </>
          } />
        </Routes>
        <div ref={contactRef}>
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;
