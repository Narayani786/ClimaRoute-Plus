import React from 'react';

function ShareButton({ url }) {
    const handleShare = () => {
        navigator.clipboard.writeText(url);
        alert('Link copied!');
    };

    return <button onClick={handleShare}>Share Route</button>;
}

export default ShareButton;
