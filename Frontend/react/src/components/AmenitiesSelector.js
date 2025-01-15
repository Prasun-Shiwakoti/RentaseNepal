import React from "react";

const allAmenities = [
  { value: "WiFi", name: "internet", emoji: "📶" },
  { value: "Air Conditioning", name:"ac", emoji: "❄️" },
  { value: "Washing Machine", name: "washing_machine", emoji: "🧺" },
  { value: "Bathroom Cleaning", name: "bathroom_cleaning", emoji: "🧽" },
  { value: "Study Table", name: "study_table", emoji: "🖥️" },
  { value: "Book Rack", name: "books_rack", emoji: "📚" },
  { value: "Wardrobe", name: "wardrobe", emoji: "👗" },
  { value: "Clothes Hanger", name: "clothes_hanger", emoji: "👚" },
  { value: "Parking", name: "parking_space", emoji: "🚗" },
  { value: "Mess", name: "mess", emoji: "🍽️" },
  { value: "CCTV", name: "cctv", emoji: "📷" },
  { value: "Power Backup", name: "generator" ,emoji: "🔌" },
  { value: "Geyser", name: "geysers" ,emoji: "🚿" },
  { value: "Heater", name: "heater" ,emoji: "🔥" },
  { value: "Gym", name: "gym" ,emoji: "💪" },
  { value: "Security Guard", name: "security_guard", emoji: "🛡️" },
  { value: "Lift", name: "lift" ,emoji: "🛗" },
  { value: "Water Cooler", name: "cooler", emoji: "🚰" },
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
          <span className="name">{amenity.value}</span>
        </div>
      ))}
    </div>
  );
};

export default AmenitiesSelector;
