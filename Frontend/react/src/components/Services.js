import React from 'react';

const Services = () => {
  const services = [
    {
      icon: "bi bi-house-door-fill",
      title: "Hostel Booking",
      description: "Find and book your ideal hostel with ease and comfort."
    },
    {
      icon: "bi bi-people-fill",
      title: "Roommate Finder",
      description: "Connect with potential roommates and find a perfect match."
    },
    {
      icon: "bi bi-map-fill",
      title: "Explore Neighborhoods",
      description: "Learn about different areas to find the best place to stay."
    },
    {
      icon: "bi bi-shield-lock-fill",
      title: "Secure Payments",
      description: "Experience safe and secure payment options for all bookings."
    }
  ];

  return (
    <div className="our-services-section">
      <h2>Our Services</h2>
      <div className="services-container">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <i className={service.icon}></i>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
