import React, { useState } from "react";
import AmenitiesSelector from "./AmenitiesSelector";
import FeeStructure from "./FeeStructure";
import WeeklyMenu from "./WeeklyMenu";
import RulesInput from "./RulesInput";

const ListYourHostel = () => {
  const [formData, setFormData] = useState({
    name: "",
    owner_name: "", // Added owner name
    contact: "",
    description: "",
    arrivalTime: "",
    gender: "Boys",
    location: "",
    mapLocation: "",
    amenities: [],
    additionalAmenities: [],
    nearbyFacilities: {
      transportation: "",
      hospitalOrPharmacy: "",
      shoppingMalls: "",
      cafesAndRestaurants: "",
      schools: "",
    },
    profilePhoto: null,
    additionalPhotos: [],
    feeStructure: {},
    messMenu: [],
    rules: [],
    // latitude: 0,
    // longitude: 0,  
  });

  const extractCoordinates = (url) => {
    const match = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (match) {
      const latitude = match[1];
      const longitude = match[2];
      return { latitude, longitude };
    } else {
      alert("Invalid Map Link");
      return null;
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.nearbyFacilities) {
      setFormData({
        ...formData,
        nearbyFacilities: {
          ...formData.nearbyFacilities,
          [name]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e, key) => {
    const file = e.target.files[0];
    setFormData({ ...formData, [key]: file });
  };

  

  const handleSubmit = async () => {
    const coordinates= extractCoordinates(formData.mapLocation) || {latitude:0, longitude:0};
    // console.log(formData.amenities);
    const formDataToSend = new FormData();
  
    // Add text fields
    formDataToSend.append("name", formData.name);
    formDataToSend.append("owner_name", formData.owner_name);
    formDataToSend.append("contact_information", formData.contact);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("latitude", coordinates.latitude);
    formDataToSend.append("longitude", coordinates.longitude);
    formDataToSend.append(
      "gender",
      formData.gender === "Boys" ? 1 : formData.gender === "Girls" ? 2 : 0
    );
    formDataToSend.append("arrival_time", formData.arrivalTime);
    formDataToSend.append(
      "transportation_bus_stations",
      formData.nearbyFacilities.transportation
    );
    formDataToSend.append(
      "nearby_hospitals_pharmacy",
      formData.nearbyFacilities.hospitalOrPharmacy
    );
    formDataToSend.append("nearby_schools", formData.nearbyFacilities.schools);
    formDataToSend.append(
      "nearby_shopping_malls",
      formData.nearbyFacilities.shoppingMalls
    );
    formDataToSend.append(
      "nearby_cafes_and_restaurants",
      formData.nearbyFacilities.cafesAndRestaurants
    );
    formDataToSend.append("description", formData.description);

    for (const [key, value] of Object.entries(formData.feeStructure)) {
      formDataToSend.append(key, value);
    }

    formDataToSend.append("rules", formData.rules.join('\n'));

    formDataToSend.append("food_menu",JSON.stringify(formData.messMenu));
  
    // Convert amenities to individual boolean fields
    const amenitiesList = [
      "internet",
      "washing_machine",
      "bathroom_cleaning",
      "study_table",
      "books_rack",
      "wardrobe",
      "clothes_hanger",
      "smoking_and_beverages_usage",
      "parking_space",
      "mess",
      "cctv",
      "generator",
      "furniture",
      "geysers",
      "heater",
      "cooler",
      "ac",
      "gym",
      "security_guard",
      "lift",
    ];
    amenitiesList.forEach((amenity) => {
      formDataToSend.append(amenity, formData.amenities.includes(amenity));
    });
  
    // Add files
    if (formData.profilePhoto) {
      formDataToSend.append("image", formData.profilePhoto); // Profile photo as the first image
    }
    formData.additionalPhotos.forEach((photo, index) => {
      formDataToSend.append("additional_images", photo); // Additional images
    });
    
    for (let [key, value] of formDataToSend.entries()) {
      console.log(key, value);
    }
    // console.log(formData.messMenu);

    // Send request
    try {
      const response = await fetch("http://127.0.0.1:8000/api/hostels/", {
        method: "POST",
        headers: {
          Authorization: "token fdc19eacbd64d055f80b9486b4b4d1fc443f67cb",
        },
        body: formDataToSend,
      });
  
      if (response.status === 201) {
        const data = await response.json();
        alert("Hostel created successfully!");
        console.log("Response Data:", data);
      } else {
        const errorData = await response.json();
        alert("Failed to create hostel: " + errorData.message);
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
      alert("An error occurred. Please try again.");
    }
  };

return (
  <div className="hostel-form-container">
    <form className="hostel-form" onSubmit={(e) => e.preventDefault()}>
      <h2>List Your Hostel</h2>
      <label>
        Hostel Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
          Owner Name:
          <input
            type="text"
            name="owner_name"
            value={formData.owner_name}
            onChange={handleInputChange}
            required
          />
        </label>
      <label>
        Owner Contact (+977):
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Enter a brief description of your hostel"
          required
        />
      </label>
      <label>
        Gender:
        <select
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
        >
          <option value="Unisex">Unisex</option>
          <option value="Boys">Boys</option>
          <option value="Girls">Girls</option>
        </select>
      </label>
      <label>
        Location:
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Google Maps Location:
        <input
          type="text"
          name="mapLocation"
          value={formData.mapLocation}
          onChange={handleInputChange}
          placeholder="Paste Google Maps link"
          required
        />
      </label>

      <label>
        Profile Photo:
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e, "profilePhoto")}
        />
      </label>

      <label>
        Additional Photos:
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) =>
            setFormData({ ...formData, additionalPhotos: [...e.target.files] })
          }
        />
      </label>

      <h3>Amenities</h3>
      <AmenitiesSelector
        amenities={formData.amenities}
        setAmenities={(amenities) =>
          setFormData({ ...formData, amenities })
        }
      />

      <h3>Fee Structure</h3>
      <FeeStructure
        feeStructure={formData.feeStructure}
        setFeeStructure={(feeStructure) =>
          setFormData({ ...formData, feeStructure })
        }
      />

      <h3>Mess Menu</h3>
      <WeeklyMenu
        messMenu={formData.messMenu}
        setMessMenu={(messMenu) =>
          setFormData({ ...formData, messMenu })
        }
      />


      <h3>Rules</h3>
      <RulesInput
        rules={formData.rules}
        setRules={(rules) => setFormData({ ...formData, rules })}
      />
      <label>
        Gate Closure Time:
        <input
          type="time"
          name="arrivalTime"
          value={formData.arrivalTime}
          onChange={handleInputChange}
          required
        />
      </label>

      <h3>Nearby Facilities</h3>
      <div className="nearby-facilities">
        <label>
          Transportation:
          <input
            type="text"
            name="transportation"
            value={formData.nearbyFacilities.transportation}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Hospital/Pharmacy:
          <input
            type="text"
            name="hospitalOrPharmacy"
            value={formData.nearbyFacilities.hospitalOrPharmacy}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Schools:
          <input
            type="text"
            name="schools"
            value={formData.nearbyFacilities.schools}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Shopping Malls:
          <input
            type="text"
            name="shoppingMalls"
            value={formData.nearbyFacilities.shoppingMalls}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Cafes/Restaurants:
          <input
            type="text"
            name="cafesAndRestaurants"
            value={formData.nearbyFacilities.cafesAndRestaurants}
            onChange={handleInputChange}
          />
        </label>
      </div>

      <button type="button" className="submit-button" onClick={handleSubmit}>
        Save Hostel Data
      </button>
    </form>
  </div>
);
};

export default ListYourHostel;
