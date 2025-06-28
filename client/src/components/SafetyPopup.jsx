import React from 'react';

function SafetyPopup({ score }) {
    return(
        <div>
            <h3>Safety Score</h3>
            <p>{ score !== null ? `Score: ${score}` : 'Loading...' }</p>
        </div>
    );
}

export default SafetyPopup;
