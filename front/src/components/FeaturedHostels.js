import React from 'react';
import HostelCard from './HostelCard';
import '../style.css';
import hostels from '../data/hostels.json';

const FeaturedHostels = () => {
    return (
        <div className="featuredhostel-section">
            <h1>Featured Hostels</h1>
            <div className="scrollable-cards">
                {hostels.map((hostel, index) => (
                    <HostelCard
                        key={index}
                        image={hostel.image}
                        name={hostel.name}
                        isFeatured={hostel.isFeatured}
                        rating={hostel.rating}
                        location={hostel.location}
                        price={hostel.price}
                        gender={hostel.gender}
                    />
                ))}
            </div>
        </div>
    );
};

export default FeaturedHostels;