import React from "react";

const allAmenities = [
  { name: "WiFi", emoji: "📶" },
  { name: "Air Conditioning", emoji: "❄️" },
  { name: "Washing Machine", emoji: "🧺" },
  { name: "Bathroom Cleaning", emoji: "🧽" },
  { name: "Study Table", emoji: "🖥️" },
  { name: "Book Rack", emoji: "📚" },
  { name: "Wardrobe", emoji: "👗" },
  { name: "Clothes Hanger", emoji: "👚" },
  { name: "Parking", emoji: "🚗" },
  { name: "Mess", emoji: "🍽️" },
  { name: "CCTV", emoji: "📷" },
  { name: "Power Backup", emoji: "🔌" },
  { name: "Geyser", emoji: "🚿" },
  { name: "Heater", emoji: "🔥" },
  { name: "Gym", emoji: "💪" },
  { name: "Security Guard", emoji: "🛡️" },
  { name: "Lift", emoji: "🛗" },
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
          <br/>
          <span className="name">{amenity.name}</span>
        </div>
      ))}
    </div>
  );
};

export default AmenitiesSelector;
