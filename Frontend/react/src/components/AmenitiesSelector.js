import React from "react";

const allAmenities = [
  { name: "WiFi", emoji: "📶" },
  { name: "Air Conditioning", emoji: "❄️" },
  { name: "Laundry", emoji: "🧺" },
  { name: "Parking", emoji: "🚗" },
  { name: "Gym", emoji: "🏋️" },
  { name: "CCTV", emoji: "📹" },
  { name: "Power Backup", emoji: "🔋" },
];

const AmenitiesSelector = ({ amenities, setAmenities }) => {
  const toggleAmenity = (name) => {
    if (amenities.includes(name)) {
      setAmenities(amenities.filter((amenity) => amenity !== name));
    } else {
      setAmenities([...amenities, name]);
    }
  };

  return (
    <div className="amenities-grid">
      {allAmenities.map((amenity) => (
        <div
          key={amenity.name}
          className={`amenity ${amenities.includes(amenity.name) ? "selected" : ""}`}
          onClick={() => toggleAmenity(amenity.name)}
        >
          <span className="emoji">{amenity.emoji}</span>
          <span className="name">{amenity.name}</span>
        </div>
      ))}
    </div>
  );
};

export default AmenitiesSelector;
