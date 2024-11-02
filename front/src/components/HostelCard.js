import React from 'react';

const HostelCard = ({ image, name, isFeatured, rating, location, price, gender }) => {
  return (
    <div className="card">
      {isFeatured && <div className="ribbon">Featured</div>}
      <img src={image} alt={name} />
      <div className="card-content">
        <div className="card-title">{name}</div>
        <div className="card-rating">
          <i className="bi bi-star-fill"></i> {rating} / 5
        </div>
        <div className="card-location">
          <i className="bi bi-geo-alt-fill"></i> {location}
        </div>
        <div className="card-price">{price}</div>
        <div className="card-gender">{gender} Hostel</div>
      </div>
    </div>
  );
};

export default HostelCard;
