import React, { useState } from 'react';
import ModeSelector from './ModeSelector';
import SafetyPopup from './SafetyPopup';
import ShareButton from './ShareButton';

function MapView() {
    const [mode, setMode] = useState('car');
    const [score, setScore] = useState(null);

    const shareURL = window.location.href;

    return(
        <div>
            <h2>ClimaRoute+ Map View</h2>
            <ModeSelector mode={mode} setMode={setMode}/>
            <SafetyPopup score={score}/>
            <ShareButton url={shareURL}/>
        </div>
    );
}

export default MapView;
