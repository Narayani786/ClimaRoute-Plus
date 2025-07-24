import React from 'react';

const SafetyPopup = ({ score, reason }) => {
    if(score === null || score === undefined) {
        return null;
    }

    return (
        <div className="safety-popup">
            <h3>Safety Score</h3>
            <p>Score: <strong>{score.score}</strong></p>
            <p>Reason: <strong>{score.reason}</strong></p>
        </div>
    );

};

export default SafetyPopup;
