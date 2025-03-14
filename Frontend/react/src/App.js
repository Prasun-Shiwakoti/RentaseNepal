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
import AddBlog from './components/AddBlog';
import Register from './components/Register';
import UserPage from './components/UserPage'

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
  const [isLoggedIn, setisLoggedIn] = useState(
    !!localStorage.getItem('admin-token') || !!localStorage.getItem('user-token')
  );
  const [userRole, setUserRole] = useState(
    localStorage.getItem('admin-token') ? 'admin' : 'user'
  );
  

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
                isLoggedIn={isLoggedIn}
                userRole={userRole}
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
              <Nav isLoggedIn={isLoggedIn} />
              <BlogDetail />
            </div>
          } />
          <Route path="/search-results" element={
            <>
              <div>
                <Nav isLoggedIn={isLoggedIn} userRole={userRole} />
                <div className="results-search-bar">
                  <SearchBar />
                </div>
              </div>
              <SearchResults />
            </>
          } />
          <Route path="/hostel/:id" element={
            <div>
              <Nav isLoggedIn={isLoggedIn} userRole={userRole} />
              <HostelDetails userRole={userRole}/>
            </div>
          } />
          <Route path="/login" element={
            <>
              <Nav isLoggedIn={isLoggedIn} userRole={userRole} />
              <AdminLogin setIsLoggedIn={setisLoggedIn}  setUserRole={setUserRole} />
            </>
          } />

          <Route path="/register" element={
            <>
              <Nav isLoggedIn={isLoggedIn} userRole={userRole} />
              <Register />
            </>
          } />

          <Route path="/admin" element={
            <>
              <Nav isLoggedIn={isLoggedIn} userRole={userRole} />
              <AdminPage setisLoggedIn={setisLoggedIn} setUserRole={setUserRole}/>
            </>
          } />

          <Route path="/user" element={
            <>
              <Nav isLoggedIn={isLoggedIn} userRole={userRole} />
              <UserPage setisLoggedIn={setisLoggedIn} setUserRole={setUserRole}/>
            </>
          } />

          <Route path="/list-your-hostel" element={
            <>
              <Nav isLoggedIn={isLoggedIn} userRole={userRole} />
              <ListYourHostel />
            </>
          } />
          <Route path="/add-blog" element={
            <>
              <Nav isLoggedIn={isLoggedIn} userRole={userRole} />
              <AddBlog />
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

// import React, { useState } from "react";
// import GoogleMapsInput from "./components/GoogleMapsInput";

// const App = () => {
//   const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

//   return (
//     <div>
//       <h2>Select Location</h2>
//       <GoogleMapsInput setCoordinates={setCoordinates} />
//       {coordinates.lat && coordinates.lng && (
//         <p>Latitude: {coordinates.lat}, Longitude: {coordinates.lng}</p>
//       )}
//     </div>
//   );
// };

// export default App;

