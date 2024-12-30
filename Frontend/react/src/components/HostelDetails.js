import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import hostels from "../data/hostels.json"; 

const HostelDetails = () => {
  const { id } = useParams(); // Get the hostel ID from the URL
  const [hostel, setHostel] = useState(null);

  useEffect(() => {
    // Find the hostel by ID from the list of hostels
    const selectedHostel = hostels.find((hostel) => hostel.id === parseInt(id));
    if (selectedHostel) {
      setHostel(selectedHostel);
    }
  }, [id]);

  if (!hostel) {
    return <p>Loading...</p>; // display a loading state until data is available
  }

  const openGoogleMaps = () => {
    window.open(hostel.mapLocation, "_blank");
  };

  const showMorePhotos = () => {
    const galleryContainer = document.querySelector(".additional-images");
    const extraGallery = document.getElementById("extraGallery");
    galleryContainer.classList.toggle("show-extra");
    extraGallery.style.display = extraGallery.style.display === "grid" ? "none" : "grid";
  };

  const addToWishlist = () => {
    console.log(`${hostel.title} added to wishlist!`);
  };

  return (
    <>
    
      <div className="hostelmain-container">
        <h2>{hostel.title}</h2>
        <br />
        <div className="hostelmain-content">
          <div className="left-section">
            {/* Gallery */}
            <div className="hosteldetail-gallery">
              {hostel.additionalPhotos.slice(0, 3).map((photo, index) => (
                <div key={index} className="hosteldetail-gallery-item">
                  <img src={photo} alt={`Room Image ${index + 1}`} />
                </div>
              ))}

              <div className="hosteldetail-gallery-item additional-images" onClick={showMorePhotos}>
                <img src={hostel.additionalPhotos[3]} alt="More Images" className="main-photo" />
                <div className="main-photo-overlay">+{hostel.additionalPhotos.length - 3}</div>
              </div>
            </div>

            {/* Extra Gallery */}
            <div className="hosteldetail-extra-gallery" id="extraGallery">
              {hostel.additionalPhotos.slice(4).map((photo, index) => (
                <img key={index} src={photo} alt={`Extra Image ${index + 1}`} />
              ))}
            </div>

            {/* Location */}
            <div className="location-wrapper">
              <p>
                <i className="bi bi-geo-alt-fill"></i> {hostel.location}
              </p>
              <button className="toggle-button" onClick={addToWishlist}>
                Add to Wishlist <i className="bi bi-suit-heart"></i>
              </button>
            </div>

            {/* Details */}
            <div className="hosteldetail-container">
              {/* Fee Structure */}
              <div className="hosteldetail-info">
                <div className="hosteldetail-title">Fee Structure</div>
                <li>Admission Fee: NPR {hostel.feeStructure.admissionFee}</li>
                <li>One-seater: NPR {hostel.feeStructure.oneSeater}</li>
                <li>Two-seater: NPR {hostel.feeStructure.twoSeater}</li>
                <li>Three-seater: NPR {hostel.feeStructure.threeSeater}</li>
                <li>Four-seater: NPR {hostel.feeStructure.fourSeater}</li>
              </div>

              {/* Facilities */}
              <div className="hosteldetail-info">
                <div className="hosteldetail-title">Facilities</div>
                {hostel.facilities.map((facility, index) => (
                  <li key={index}>{facility}</li>
                ))}
              </div>

              {/* Nearby Facilities */}
              <div className="hosteldetail-info">
                <div className="hosteldetail-title">Nearby Facilities</div>
                <li>
                  <i className="bi bi-hospital"></i> Transportation/Bus stations: {hostel.nearbyFacilities.transportation}
                </li>
                <li>Nearby hospital or pharmacy: {hostel.nearbyFacilities.hospitalOrPharmacy}</li>
                <li>Nearby Schools: {hostel.nearbyFacilities.schools}</li>
                <li>Nearby shopping malls: {hostel.nearbyFacilities.shoppingMalls}</li>
                <li>Nearby Cafes and Restaurants: {hostel.nearbyFacilities.cafesAndRestaurants}</li>
              </div>

              {/* Rules */}
              <div className="hosteldetail-info">
                <div className="hosteldetail-title">Rules</div>
                <div className="rule">
                {hostel.rules.map((rule, index) => (
                    <div key={index} className="rule-icon-box">
                        <p>
                          <i className={rule.icon}></i>
                        </p>
                        <p>{rule.description}</p>
                      </div>
                ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="right-section">
            {/* Map */}
            <div className="map-box">
              <h2>Location</h2>
              <iframe
                // src={hostel.mapLocation}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3197.167089145057!2d85.33423837492234!3d27.68686962639529!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19944a9df48f%3A0xcba464cd90d31b1a!2sGarud%20Boys%20Hostel!5e1!3m2!1sen!2snp!4v1730982917722!5m2!1sen!2snp"
                width="600"
                height="450"
                style={{ border: "0" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <button className="toggle-button" onClick={openGoogleMaps}>
              View on Google Maps
            </button>

            {/* Mess Menu */}
            <div className="mess-menu">
              <h2>Mess Menu</h2>
              <table>
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Breakfast</th>
                    <th>Lunch</th>
                    <th>Dinner</th>
                  </tr>
                </thead>
                <tbody>
                  {hostel.messMenu.map((menu, index) => (
                    <tr key={index}>
                      <td>{menu.day}</td>
                      <td>{menu.breakfast}</td>
                      <td>{menu.lunch}</td>
                      <td>{menu.dinner}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HostelDetails;
