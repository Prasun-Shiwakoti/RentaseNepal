/* global google */
import React, { useEffect } from "react";
import { NonceProvider } from "react-select";

const GoogleMapsInput = ({ setCoordinates }) => {
  useEffect(() => {
    const loadGoogleMaps = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.body.appendChild(script);
    };

    const initMap = () => {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 27.7172, lng: 85.324 }, // Default location (Kathmandu)
        zoom: 13,
        disableDefaultUI: false, // Allows removing Street View later
        streetViewControl: false, // Removes "Open Street View"
        zoomControl: false,
      });

      const input = document.getElementById("searchBox");
      const autocomplete = new google.maps.places.Autocomplete(input);
      autocomplete.bindTo("bounds", map);

      const marker = new google.maps.Marker({
        map,
        draggable: true,
      });

      // 📌 Event: When user selects a place from search
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) return;

        map.setCenter(place.geometry.location);
        map.setZoom(17);
        marker.setPosition(place.geometry.location);

        setCoordinates({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
      });

      // 📌 Event: When user clicks on the map
      map.addListener("click", (event) => {
        marker.setPosition(event.latLng);
        setCoordinates({
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        });
      });
    };

    if (!window.google) {
      loadGoogleMaps();
    } else {
      initMap();
    }
  }, [setCoordinates]);

  return (
    <div>
      <input id="searchBox" type="text" placeholder="Search for a place" />
      <div id="map" style={{ height: "400px", width: "100%" }}></div>
    </div>
  );
};

export default GoogleMapsInput;
