function toggleHostelRows() {
  const hiddenHostelRows = document.querySelectorAll('.featured-grid .hidden-row');
  const hostelButton = document.querySelector('.featured-grid ~ .toggle-button');
  
  // to check the rows if they are hidden or not
  const isHidden = hiddenHostelRows[0].style.display === 'none' || hiddenHostelRows[0].style.display === '';
  
  hiddenHostelRows.forEach(row => row.style.display = isHidden ? 'block' : 'none');
  
  hostelButton.textContent = isHidden ? 'Show Less' : 'Show More';
}

function toggleCityRows() {
  const hiddenCityRows = document.querySelectorAll('.top-cities-grid .hidden-row');
  const cityButton = document.querySelector('.top-cities-grid ~ .toggle-button');
  
 
  const isHidden = hiddenCityRows[0].style.display === 'none' || hiddenCityRows[0].style.display === '';
  
  hiddenCityRows.forEach(row => row.style.display = isHidden ? 'block' : 'none');
  
  cityButton.textContent = isHidden ? 'Show Less' : 'Show More';
}

function goToDetails(cityName) {
  window.location.href = cityName.toLowerCase() + "-details.html";
}


document.querySelectorAll('.hidden-row').forEach(row => row.style.display = 'none');


// hostel detail page functions

function showmorephotos() {
  const galleryContainer = document.querySelector(".additional-images");
  const extraGallery = document.getElementById("extraGallery");
  galleryContainer.classList.toggle("show-extra");
  extraGallery.style.display = extraGallery.style.display === "grid" ? "none" : "grid";
}

function opengooglemaps(){
            
  const mapUrl = "https://maps.app.goo.gl/sxJPfkXcWtH7HrRQ8";


   window.open(mapUrl, "_blank");


}