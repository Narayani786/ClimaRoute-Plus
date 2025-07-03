import React, { useState, useEffect } from 'react';

import '@tomtom-international/web-sdk-maps/dist/maps.css';
import tt from '@tomtom-international/web-sdk-maps';

import ShareButton from './ShareButton';
import ModeSelector from './ModeSelector';
import SafetyPopup from './SafetyPopup';


function MapView() {
    const [mode, setMode] = useState('car');
    const [score, setScore] = useState(null);

    const shareURL = window.location.href;
    
  useEffect(() => {
  const loadTomTomSDK = async () => {
    // Load the SDK only if not already loaded
    if (!window.tt || !window.tt.map) {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.14.0/maps/maps-web.min.js';
        script.async = true;
        script.onload = resolve;
        script.onerror = () => reject(new Error('TomTom SDK failed to load'));
        document.body.appendChild(script);
      });
    }

    // Ensure the 'map' div exists before trying to render
    const mapContainer = document.getElementById('map');
    if (!mapContainer) {
      console.warn("Map container not found");
      return;
    }

    // Initialize the map
    const map = window.tt.map({
      key: import.meta.env.VITE_TOMTOM_API_KEY,
      container: 'map',
      center: [77.2090, 28.6139], // Delhi (default center)
      zoom: 10,
    });

    // Add navigation controls safely
    if (window.tt.control && window.tt.control.NavigationControl) {
      map.addControl(new window.tt.control.NavigationControl());
    }
  };

  loadTomTomSDK().catch((err) =>
    console.error('Error loading TomTom Map:', err.message || err)
  );
}, []);



  
const fetchSafetyScore = async (start, end, mode) => {
      try {

        if(!start || !end || !mode) {
          console.error('Missing parameters in fetchSafetyScore');
          return;
        }

        const startStr = `${start.lat}, ${start.lng}`;
        const endStr = `${end.lat}, ${end.lng}`;

        const response = await fetch(`http://localhost:5000/api/route?start=${startStr}&end=${endStr}&mode=${mode}`
        );

        if(!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
            const data = await response.json();
            console.log('Safety score:', data.score);
            setScore(data.score);
          } catch (error) {
            console.error('Error fetching safety score:', error);
          }
      };


      // initialize map and handle click events

      useEffect(() => {
        const initMap = () => {
          const map = tt.map({
            key: import.meta.env.VITE_TOMTOM_API_KEY,
            container: 'map',
            center: [77.1025, 28.7041],
            zoom: 10,
          });

          let startMarker = null;
          let endMarker = null;
          let layerMarker = null;

          map.on('click', (e) => {
            const { lng, lat } = e.lngLat;

            if(!startMarker) {
              startMarker = new tt.Marker().setLngLat([lng, lat]).addTo(map);
            } else if (!endMarker) {
              endMarker = new tt.Marker().setLngLat([lng, lat]).addTo(map);

              const start = startMarker.getLngLat();
              const end = endMarker.getLngLat();

              fetchSafetyScore(start, end, mode, map);
            } else {
              startMarker.remove();
              endMarker.remove();
              startMarker = new tt.Marker().setLngLat([lng, lat]).addTo(map);
              endMarker = null;

              if(routeLayer) {
                map.removeLayer('route');
                map.removeSource('route');
                routeLayer = null;
              }
              setScore(null);
            }
          });
        };
        initMap();
      }, []);


    return(
        <div className="map-container">
            <h2>ClimaRoute+ Map View</h2>
            <ModeSelector mode={mode} setMode={setMode}/>
            <SafetyPopup score={score}/>
            <ShareButton url={shareURL}/>

            <div id='map'
            style={{ width: '100%', height: '400px', margin: '16px' }}>
              <SafetyPopup score={score}/>
            </div>
        </div>
    );
}

export default MapView;
