import React, { useState, useEffect } from 'react';
import ModeSelector from './ModeSelector';
import SafetyPopup from './SafetyPopup';
import ShareButton from './ShareButton';

function MapView() {
    const [mode, setMode] = useState('car');
    const [score, setScore] = useState(null);

    const shareURL = window.location.href;

    useEffect(() => {
        if(window.tt && document.getElementById('map')) {
            const map = window.tt.map({
                key: import.meta.env.VITE_TOMTOM_API_KEY,
                container: 'map',
                center: [77.2090, 28.6139], // Delhi
                zoom: 10,
            });

            map.addControl(new window.tt.control.NavigateControl());
        }
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
