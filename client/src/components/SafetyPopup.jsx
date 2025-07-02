import React from 'react';

function SafetyPopup({ score }) {
    return(
        <div>
            <p><strong>
                Safety Score:</strong>
                {score !== null? score : 'Click two points on map'}
            </p>

        </div>
    );
}

export default SafetyPopup;
