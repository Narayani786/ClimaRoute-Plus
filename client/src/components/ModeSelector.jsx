import React from 'react';

function ModeSelector({ mode, setMode }) {
    return(
        <div>
            <label>Select Mode: </label>
            <select value={mode} onChange={(e) => setMode(e.target.value)}>
                <option value="car">Car</option>
                <option value="bicycle">Bicycle</option>
                <option value="pedestrian">Pedestrian</option>
            </select>
        </div>
    );
}

export default ModeSelector;