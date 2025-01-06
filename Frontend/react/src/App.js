import React, { useRef, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import TopCities from './components/TopCities';
import FeaturedHostels from './components/FeaturedHostels';
import Footer from './components/Footer';
import Blogs from './components/Blogs';
import Services from './components/Services';
import SearchResults from './components/SearchResults';
import Nav from './components/Nav';
import AdminLogin from './components/AdminLogin';
import AdminPage from './components/AdminPage';
import SearchBar from './components/SearchBar';
import './style.css';
import ScrollToTop from './components/ScrollToTop';
import HostelDetails from './components/HostelDetails';
import ListYourHostel from './components/ListYourHostel';
import BlogDetail from './components/BlogDetail';

export const scrollToSection = (elementRef) => {
  window.scrollTo({
    top: elementRef.current.offsetTop,
    behavior: 'smooth'
  })
}

const App = () => {
  const blogRef = useRef(null);
  const contactRef = useRef(null);
  const serviceRef = useRef(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(!!localStorage.getItem('adminToken'));

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
                isAdminLoggedIn={isAdminLoggedIn}
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
          <Route path="/blog/:id" element={
            <div>
              <Nav isAdminLoggedIn={isAdminLoggedIn} />
              <BlogDetail />
            </div>
          } />
          <Route path="/search-results" element={
            <>
              <div>
                <Nav isAdminLoggedIn={isAdminLoggedIn} />
                <div className="results-search-bar">
                  <SearchBar />
                </div>
              </div>
              <SearchResults />
            </>
          } />
          <Route path="/hostel/:id" element={
            <div>
              <Nav isAdminLoggedIn={isAdminLoggedIn} />
              <HostelDetails />
            </div>
          } />
          <Route path="/admin-login" element={
            <>
              <Nav isAdminLoggedIn={isAdminLoggedIn} />
              <AdminLogin setIsAdminLoggedIn={setIsAdminLoggedIn} />
            </>
          } />
          <Route path="/admin" element={
            <>
              <Nav isAdminLoggedIn={isAdminLoggedIn} />
              <AdminPage />
            </>
          } />
          <Route path="/list-your-hostel" element={
            <>
              <Nav isAdminLoggedIn={isAdminLoggedIn}/>
              <ListYourHostel />
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
