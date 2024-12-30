import React, { useState } from "react";
import AmenitiesSelector from "./AmenitiesSelector";
import FeeStructure from "./FeeStructure";
import WeeklyMenu from "./WeeklyMenu";
import RulesInput from "./RulesInput";

const ListYourHostel = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
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
    },
    profilePhoto: null,
    additionalPhotos: [],
    feeStructure: {},
    messMenu: [],
    rules: [],
  });

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

  const handleSubmit = () => {
    const jsonData = JSON.stringify(formData, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "hostelData.json";
    link.click();
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
