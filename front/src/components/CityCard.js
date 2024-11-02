import React from 'react';

const CityCard = ({ name, image, description, onClick }) => {
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
