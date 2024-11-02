import React from 'react';
import '../style.css';

const toggleCityRows = () => {
  const hiddenCityRows = document.querySelectorAll('.top-cities-grid .hidden-row');
  const cityButton = document.querySelector('.top-cities-grid ~ .toggle-button');
  
 
  const isHidden = hiddenCityRows[0].style.display === 'none' || hiddenCityRows[0].style.display === '';
  
  hiddenCityRows.forEach(row => row.style.display = isHidden ? 'block' : 'none');
  
  cityButton.textContent = isHidden ? 'Show Less' : 'Show More';
};

const goToDetails = (cityName) => {
  window.location.href = cityName.toLowerCase() + "-details.html";
}

const TopCities = () => {
  return (
    <div className="topcities-section">

      <div className="topcities-container">
        <h1>Our Top Places</h1>
        <p>Choose The places You’ll Be Living In Next, Or Look For Flatmates And Rooms Near You</p>
        <div className="grid top-cities-grid">

          <div className="card " onClick={goToDetails('Bagbazar')}>
            <img src="img/bagbazar.jpeg" alt="Bagbazar"/>
              <div className="card-content">
                <div className="card-title">Bagbazar</div>
                <div className="card-info">Lorem ipsum dolor sit, amet consectetur adipisicing elit.<br/> dolorem sit
                  quaerat sunt repudiandae.</div>
              </div>
          </div>

          <div className="card" onClick={goToDetails('Bagbazar')}>
            <img src="img/maitidevi.jpg" alt="Bagbazar"/>
              <div className="card-content">
                <div className="card-title">Maitidevi</div>
                <div className="card-info">Lorem ipsum dolor sit, amet consectetur adipisicing elit.<br/> dolorem sit
                  quaerat sunt repudiandae.</div>
              </div>

          </div>

          <div className="card" onClick={goToDetails('Bagbazar')}>
            <img src="img/baneshwor.jpg" alt="Baneshwor"/>
              <div className="card-content">
                <div className="card-title">Baneshwor</div>
                <div className="card-info">Lorem ipsum dolor sit, amet consectetur adipisicing elit.<br/> dolorem sit
                  quaerat sunt repudiandae.</div>
              </div>
          </div>

          <div className="card" onClick={goToDetails('Bagbazar')}>
            <img src="img/maitidevi.jpg" alt="Bagbazar"/>
              <div className="card-content">
                <div className="card-title">Kalimati</div>
                <div className="card-info">Lorem ipsum dolor sit, amet consectetur adipisicing elit.<br/> dolorem sit
                  quaerat sunt repudiandae.</div>
              </div>
          </div>

          <div className="card hidden-row" onClick={goToDetails('Bagbazar')}>
            <img src="img/koteshwor.jpg" alt="Kalimati"/>
              <div className="card-content">
                <div className="card-title">Kalimati</div>
                <div className="card-info">Lorem ipsum dolor sit, amet consectetur adipisicing elit.<br/> dolorem sit
                  quaerat sunt repudiandae.</div>
              </div>
          </div>

          <div className="card hidden-row" onClick={goToDetails('Bagbazar')}>
            <img src="img/koteshwor.jpg" alt="Kalimati"/>
              <div className="card-content">
                <div className="card-title">Kalimati</div>
                <div className="card-info">Lorem ipsum dolor sit, amet consectetur adipisicing elit.<br/> dolorem sit
                  quaerat sunt repudiandae.</div>
              </div>
          </div>

          <div className="card hidden-row" onClick={goToDetails('Bagbazar')}>
            <img src="img/koteshwor.jpg" alt="Kalimati"/>
              <div className="card-content">
                <div className="card-title">Kalimati</div>
                <div className="card-info">Lorem ipsum dolor sit, amet consectetur adipisicing elit.<br/> dolorem sit
                  quaerat sunt repudiandae.</div>
              </div>
          </div>

          <div className="card hidden-row" onClick={goToDetails('Bagbazar')}>
            <img src="img/koteshwor.jpg" alt="Kalimati"/>
              <div className="card-content">
                <div className="card-title">Kalimati</div>
                <div className="card-info">Lorem ipsum dolor sit, amet consectetur adipisicing elit.<br/> dolorem sit
                  quaerat sunt repudiandae.</div>
              </div>
          </div>


        </div>
        <button className="toggle-button" onClick={toggleCityRows}>Show More</button>
      </div>
    </div>
  );
};

export default TopCities;
