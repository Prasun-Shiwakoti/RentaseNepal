import React from 'react';
import axios from 'axios';
const CityCard = ({ name, image, description, onClick }) => {

  axios
  .get('http://localhost:8000/api/hostels/')
  .then((response) => console.log(response.data))
  .catch((error) => console.error('Error:', error));

  return (
    <div className="card" onClick={onClick}>
      <img src={image} alt={name} />
      <div className="card-content">
        <div className="card-title">{name}</div>
        <div className="card-info">{description}</div>
      </div>
    </div>
  );
};

export default CityCard;
