import React from 'react';
import { useNavigate } from 'react-router-dom';

const HostelCard = ({ id, image, name, isFeatured, rating, location, price, gender }) => {
  if(!name) name=`Hostel ${parseInt(1000+id)}`;
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/hostel/${id}`); //Open in same tab
    // window.open(`/hostel/${id}`, '_blank'); //Open in new tab
  };
  return (
    <div className="card" onClick={handleCardClick}>
      {isFeatured && <div className="ribbon">Featured</div>}
      <img src={image} alt={name} />
      <div className="card-content">
        <div className="card-title">{name}</div>
        {/* <div className="card-rating">
          <i className="bi bi-star-fill"></i> {rating} / 5
        </div> */}
        <div className="card-location">
          <i className="bi bi-geo-alt-fill"></i> {location}
        </div>
        <div className="card-price">Starting from Rs. {price}</div>
        <div className="card-gender">
          {gender === 0 ? 'Girls Hostel' : 'Boys Hostel'}
        </div>
      </div>
    </div>
  );
};

export default HostelCard;
