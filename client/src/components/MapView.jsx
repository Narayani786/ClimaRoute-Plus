import React, { useState, useEffect } from 'react';
import ModeSelector from './ModeSelector';
import SafetyPopup from './SafetyPopup';
import ShareButton from './ShareButton';

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


  useEffect(() => {
    const fetchSafetyScore = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/route',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
              body: JSON.stringify({
                start: { lat: 28.6139, lon: 77.2090 },
                end: { lat: 28.9845, lon: 77.7064 },
                mode: mode,
              }),
            });
            const data = await response.json();
            console.log('API response:', data);

            if(data.safetyScore) {
              setScore(data.safetyScore);
            } else {
              setScore('Error');
            }
          } catch (error) {
            console.error('Error fetching safety score:', error);
            setScore('Error');
          }
      };
      fetchSafetyScore();
  }, [mode]);

  

    return(
        <div id="map" style={{ width: '100%', height: '400px' }}>
            <h2>ClimaRoute+ Map View</h2>
            <ModeSelector mode={mode} setMode={setMode}/>
            <SafetyPopup score={score}/>
            <ShareButton url={shareURL}/>
        </div>
    );
}

export default MapView;
