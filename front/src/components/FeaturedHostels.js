import React from 'react';
import '../style.css';

function toggleHostelRows() {
  const hiddenHostelRows = document.querySelectorAll('.featured-grid .hidden-row');
  const hostelButton = document.querySelector('.featured-grid ~ .toggle-button');
  
  // to check the rows if they are hidden or not
  const isHidden = hiddenHostelRows[0].style.display === 'none' || hiddenHostelRows[0].style.display === '';
  
  hiddenHostelRows.forEach(row => row.style.display = isHidden ? 'block' : 'none');
  
  hostelButton.textContent = isHidden ? 'Show Less' : 'Show More';
}

const FeaturedHostels = () => {
  return (
    <div className="featuredhostel-section">
        <h1>Featured Hostels</h1>
        <div className="grid featured-grid">
            <div className="card">
                <img src="img/hostel1.jpg" alt="Hostel 1"/>
                <div className="card-content">
                    <div className="card-title">Hostel 1</div>
                    <div className="card-price">Rs. 10,500</div>
                    <div className="card-type">Boys Hostel</div>
                    <div className="card-location">Location 1</div>
                </div>
            </div>

            <div className="card">
                <img src="img/hostel1.jpg" alt="Hostel 1"/>
                <div className="card-content">
                    <div className="card-title">Hostel 1</div>
                    <div className="card-price">Rs. 10,500</div>
                    <div className="card-type">Boys Hostel</div>
                    <div className="card-location">Location 1</div>
                </div>
            </div>

            <div className="card">
                <img src="img/hostel1.jpg" alt="Hostel 1"/>
                <div className="card-content">
                    <div className="card-title">Hostel 1</div>
                    <div className="card-price">Rs. 10,500</div>
                    <div className="card-type">Boys Hostel</div>
                    <div className="card-location">Location 1</div>
                </div>
            </div>

            <div className="card">
                <img src="img/hostel1.jpg" alt="Hostel 1"/>
                <div className="card-content">
                    <div className="card-title">Hostel 1</div>
                    <div className="card-price">Rs. 10,500</div>
                    <div className="card-type">Boys Hostel</div>
                    <div className="card-location">Location 1</div>
                </div>
            </div>

            <div className="card">
                <img src="img/hostel1.jpg" alt="Hostel 1"/>
                <div className="card-content">
                    <div className="card-title">Hostel 1</div>
                    <div className="card-price">Rs. 10,500</div>
                    <div className="card-type">Boys Hostel</div>
                    <div className="card-location">Location 1</div>
                </div>
            </div>


            <div className="card">
                <img src="img/hostel1.jpg" alt="Hostel 1"/>
                <div className="card-content">
                    <div className="card-title">Hostel 1</div>
                    <div className="card-price">Rs. 10,500</div>
                    <div className="card-type">Boys Hostel</div>
                    <div className="card-location">Location 1</div>
                </div>
            </div>

            <div className="card">
                <img src="img/hostel1.jpg" alt="Hostel 1"/>
                <div className="card-content">
                    <div className="card-title">Hostel 1</div>
                    <div className="card-price">Rs. 10,500</div>
                    <div className="card-type">Boys Hostel</div>
                    <div className="card-location">Location 1</div>
                </div>
            </div>

            <div className="card">
                <img src="img/hostel1.jpg" alt="Hostel 1"/>
                <div className="card-content">
                    <div className="card-title">Hostel 1</div>
                    <div className="card-price">Rs. 10,500</div>
                    <div className="card-type">Boys Hostel</div>
                    <div className="card-location">Location 1</div>
                </div>
            </div>

            <div className="card">
                <img src="img/hostel1.jpg" alt="Hostel 1"/>
                <div className="card-content">
                    <div className="card-title">Hostel 1</div>
                    <div className="card-price">Rs. 10,500</div>
                    <div className="card-type">Boys Hostel</div>
                    <div className="card-location">Location 1</div>
                </div>
            </div>

            <div className="card">
                <img src="img/hostel1.jpg" alt="Hostel 1"/>
                <div className="card-content">
                    <div className="card-title">Hostel 1</div>
                    <div className="card-price">Rs. 10,500</div>
                    <div className="card-type">Boys Hostel</div>
                    <div className="card-location">Location 1</div>
                </div>
            </div>

            <div className="card hidden-row">
                <img src="img/hostel2.jpg" alt="Hostel 2"/>
                <div className="card-content">
                    <div className="card-title">Hostel 11</div>
                    <div className="card-price">Rs. 9,000</div>
                    <div className="card-type">Boys Hostel</div>
                    <div className="card-location">Location 11</div>
                </div>
            </div>

            <div className="card hidden-row">
                <img src="img/hostel2.jpg" alt="Hostel 2"/>
                <div className="card-content">
                    <div className="card-title">Hostel 11</div>
                    <div className="card-price">Rs. 9,000</div>
                    <div className="card-type">Boys Hostel</div>
                    <div className="card-location">Location 11</div>
                </div>
            </div>

            <div className="card hidden-row">
                <img src="img/hostel2.jpg" alt="Hostel 2"/>
                <div className="card-content">
                    <div className="card-title">Hostel 11</div>
                    <div className="card-price">Rs. 9,000</div>
                    <div className="card-type">Boys Hostel</div>
                    <div className="card-location">Location 11</div>
                </div>
            </div>

            <div className="card hidden-row">
                <img src="img/hostel2.jpg" alt="Hostel 2"/>
                <div className="card-content">
                    <div className="card-title">Hostel 11</div>
                    <div className="card-price">Rs. 9,000</div>
                    <div className="card-type">Boys Hostel</div>
                    <div className="card-location">Location 11</div>
                </div>
            </div>

            <div className="card hidden-row">
                <img src="img/hostel2.jpg" alt="Hostel 2"/>
                <div className="card-content">
                    <div className="card-title">Hostel 11</div>
                    <div className="card-price">Rs. 9,000</div>
                    <div className="card-type">Boys Hostel</div>
                    <div className="card-location">Location 11</div>
                </div>
            </div>


            <div className="card hidden-row">
                <img src="img/hostel2.jpg" alt="Hostel 2"/>
                <div className="card-content">
                    <div className="card-title">Hostel 11</div>
                    <div className="card-price">Rs. 9,000</div>
                    <div className="card-type">Boys Hostel</div>
                    <div className="card-location">Location 11</div>
                </div>
            </div>

            <div className="card hidden-row">
                <img src="img/hostel2.jpg" alt="Hostel 2"/>
                <div className="card-content">
                    <div className="card-title">Hostel 11</div>
                    <div className="card-price">Rs. 9,000</div>
                    <div className="card-type">Boys Hostel</div>
                    <div className="card-location">Location 11</div>
                </div>
            </div>

            <div className="card hidden-row">
                <img src="img/hostel2.jpg" alt="Hostel 2"/>
                <div className="card-content">
                    <div className="card-title">Hostel 11</div>
                    <div className="card-price">Rs. 9,000</div>
                    <div className="card-type">Boys Hostel</div>
                    <div className="card-location">Location 11</div>
                </div>
            </div>

            <div className="card hidden-row">
                <img src="img/hostel2.jpg" alt="Hostel 2"/>
                <div className="card-content">
                    <div className="card-title">Hostel 11</div>
                    <div className="card-price">Rs. 9,000</div>
                    <div className="card-type">Boys Hostel</div>
                    <div className="card-location">Location 11</div>
                </div>
            </div>

            <div className="card hidden-row">
                <img src="img/hostel2.jpg" alt="Hostel 2"/>
                <div className="card-content">
                    <div className="card-title">Hostel 11</div>
                    <div className="card-price">Rs. 9,000</div>
                    <div className="card-type">Boys Hostel</div>
                    <div className="card-location">Location 11</div>
                </div>
            </div>
        </div>

        <button className="toggle-button" onClick={toggleHostelRows}>Show More</button>

    </div>
  );
};

export default FeaturedHostels;
