import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// import hostels from "../data/hostels.json"; 

const HostelDetails = () => {
  const { id } = useParams(); // Get the hostel ID from the URL
  const [hostel, setHostel] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const allAmenities = [
    { value: "WiFi", name: "internet", emoji: "📶" },
    { value: "Air Conditioning", name: "ac", emoji: "❄️" },
    { value: "Washing Machine", name: "washing_machine", emoji: "🧺" },
    { value: "Bathroom Cleaning", name: "bathroom_cleaning", emoji: "🧽" },
    { value: "Study Table", name: "study_table", emoji: "🖥️" },
    { value: "Book Rack", name: "books_rack", emoji: "📚" },
    { value: "Wardrobe", name: "wardrobe", emoji: "👗" },
    { value: "Clothes Hanger", name: "clothes_hanger", emoji: "👚" },
    { value: "Parking", name: "parking_space", emoji: "🚗" },
    { value: "Mess", name: "mess", emoji: "🍽️" },
    { value: "CCTV", name: "cctv", emoji: "📷" },
    { value: "Power Backup", name: "generator", emoji: "🔌" },
    { value: "Geyser", name: "geysers", emoji: "🚿" },
    { value: "Heater", name: "heater", emoji: "🔥" },
    { value: "Gym", name: "gym", emoji: "💪" },
    { value: "Security Guard", name: "security_guard", emoji: "🛡️" },
    { value: "Lift", name: "lift", emoji: "🛗" },
    { value: "Water Cooler", name: "cooler", emoji: "🚰" },
  ];

  
  const fetchHostel = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/hostels/${id}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch hostels. Please try again.');
      }

      const data = await response.json();
      if (!data) {
        throw new Error('Hostel not found');
      }
      setHostel(data);
      console.log(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchHostel();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (loading) {
    return <div>Loading Hostel Details...</div>;
  }

  if (!hostel) {
    return <div>No Hostel Details Available</div>;
  }


  // useEffect(() => {
  //   // Find the hostel by ID from the list of hostels
  //   const selectedHostel = hostels.find((hostel) => hostel.id === parseInt(id));
  //   if (selectedHostel) {
  //     setHostel(selectedHostel);
  //   }
  // }, [id]);

  // if (!hostel) {
  //   return <p>Loading...</p>; // display a loading state until data is available
  // }

  const openGoogleMaps = () => {
    window.open(`https://maps.google.com/?q=${hostel.longitude},${hostel.latitude}`, "_blank");
  };

  const showMorePhotos = () => {
    const galleryContainer = document.querySelector(".additional-images");
    const extraGallery = document.getElementById("extraGallery");
    galleryContainer.classList.toggle("show-extra");
    extraGallery.style.display = extraGallery.style.display === "grid" ? "none" : "grid";
  };

  const enquire = () => {
    console.log(`${hostel.name} added to wishlist!`);
  };

  return (
    <>
      <div className="hostelmain-container">
        <h2>{hostel.name}</h2>
        <br />
        <div className="hostelmain-content">
          <div className="left-section">
            {/* Gallery */}
            <div className="hosteldetail-gallery">
              <div className="hosteldetail-gallery-item">
                <img src={hostel.image} alt='profile image' />
              </div>
              {hostel.additional_image.slice(0, 2).map((photo, index) => (
                <div key={index} className="hosteldetail-gallery-item">
                  <img src={photo.image} alt={`Room ${index + 1}`} />
                </div>
              ))}

              <div className="hosteldetail-gallery-item additional-images" onClick={showMorePhotos}>
                <img src={hostel.additional_image[2].image} alt="More Images" className="main-photo" />
                <div className="main-photo-overlay">+{hostel.additional_image.length - 2}</div>
              </div>
            </div>

            {/* Extra Gallery */}
            <div className="hosteldetail-extra-gallery" id="extraGallery">
              {hostel.additional_image.slice(3).map((photo, index) => (
                <img key={index} src={photo.image} alt={`Extra ${index + 1}`} />
              ))}
            </div>

            {/* Location */}
            <div className="location-wrapper">
              <p>
                <i className="bi bi-geo-alt-fill"></i> {hostel.location}
              </p>
              <button className="toggle-button" onClick={enquire}>
                Enquire now <i className="bi bi-suit-heart"></i>
              </button>
            </div>

            {/* Details */}
            <div className="hosteldetail-container">
              {/* Fee Structure */}
              <div className="hosteldetail-info">
                <div className="hosteldetail-title">Fee Structure</div>
                <li>Admission Fee: NPR {hostel.admission_price}</li>
                <li>One-seater: NPR {hostel.admission_price}</li>
                <li>Two-seater: NPR {hostel.admission_price}</li>
                <li>Three-seater: NPR {hostel.admission_price}</li>
                <li>Four-seater: NPR {hostel.admission_price}</li>
              </div>

              {/* Facilities */}
              <div className="hosteldetail-info">
                <div className="hosteldetail-title">Facilities</div>
                  {allAmenities.map((amenity) => (
                    hostel[amenity.name] && (
                      <li key={amenity.name}>
                        <span>{amenity.emoji}</span> {amenity.value}
                      </li>
                    )
                  ))}
              </div>


              {/* Nearby Facilities */}
              <div className="hosteldetail-info">
                <div className="hosteldetail-title">Nearby Facilities</div>
                <li>
                  <i className="bi bi-bus-front"></i>
                  Transportation/Bus stations: {hostel.transportation_bus_stations}
                </li>
                <li>
                  <i className="bi bi-hospital"></i>
                  Nearby hospital or pharmacy: {hostel.nearby_hospitals_pharmacy}
                </li>
                <li>
                  <i className="bi bi-book-half"></i>
                  Nearby Schools: {hostel.nearby_schools}
                </li>
                <li>
                  <i className="bi bi-bag"></i>
                  Nearby shopping malls: {hostel.nearby_shopping_malls}
                </li>
                <li>
                  <i className="bi bi-cup-hot"></i>
                  Nearby Cafes and Restaurants: {hostel.nearby_cafes_and_restaurants}
                </li>
              </div>

              {/* Rules */}
              <div className="hosteldetail-info">
                <div className="hosteldetail-title">Rules</div>
                <div className="rule">
                  {hostel.rules && hostel.rules.split('\n').map((rule, index) => (
                    <div key={index} className="rule-icon-box">
                      <p>
                        <i className={rule.icon}></i>
                      </p>
                      <p>{rule}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="right-section">
            {/* Map */}
            <div className="map-box hosteldetail-info">
              <div className="hosteldetail-title">Location</div>
              <iframe
                // src={hostel.mapLocation}
                src={`https://maps.google.com/?q=${hostel.longitude},${hostel.latitude}`}
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
            <div className="mess-menu hosteldetail-info">
              <div className="hosteldetail-title">Mess Menu</div>
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
                  {Object.entries(hostel.food_menu).map(([day, meals]) => ({
                    day,
                    breakfast: meals.Breakfast,
                    lunch: meals.Lunch,
                    dinner: meals.Dinner,
                  })).map((menu, index) => (
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
