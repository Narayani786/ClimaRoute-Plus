import React from 'react';

const SafetyPopup = ({ score, reason }) => {
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
            <p>Score: <strong>{score.score}</strong></p>
            <p>{getSafetyMessage(score)}</p>
            <p>Reason: <strong>{score.reason}</strong></p>
        </div>
    );

};

export default SafetyPopup;
