import React from 'react';

const SafetyPopup = ({ score }) => {
    if(score === null || score === undefined) {
        return null;
    }

    const getSafetyMessage = (score) => {
        if(score >= 80) return 'Safe Route';
        if(score >= 50) return 'Moderate Route';
        return 'Risky Route';
    };

    return (
        <div className="safety-popup">
            <h3>Safety Score</h3>
            <p>Score: <strong>{score}</strong></p>
            <p>{getSafetyMessage(score)}</p>
        </div>
    );

};

export default SafetyPopup;
