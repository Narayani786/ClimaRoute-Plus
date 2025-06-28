import React, { useState, useEffect } from 'react';
import ModeSelector from './ModeSelector';
import SafetyPopup from './SafetyPopup';
import ShareButton from './ShareButton';

function MapView() {
    const [mode, setMode] = useState('car');
    const [score, setScore] = useState(null);

    const shareURL = window.location.href;

    useEffect(() => {
        const loadTomTomMap = async () => {
            if(!window.tt || !window.tt.map) {
                await new Promise((resolve, reject) => {
                    const script = document.createElement('script');
                    script.src = 'https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.14.0/maps/maps-web.min.js';

                    script.async = true;
                    script.onload = resolve;
                    script.onerror = reject;

                    document.body.appendChild(script);
                });
            }
            const map = window.tt.map({
                key: import.meta.env.VITE_TOMTOM_API_KEY,
                container: 'map',
                center: [77.2090, 28.6139],
                zoome: 10,
            });

            if (window.tt.control && window.tt.control.NavigationControl) {
                map.addControl(new window.tt.control.NavigationControl());
            } else {
                console.warn('NavigationControl is not available yet');
            }
        };

        loadTomTomMap().catch((err) =>
        console.error('Map load error:', err.message || err)
    );
    }, []);


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
