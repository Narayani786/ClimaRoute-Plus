import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return(
        <div>
            <h1>Welcome to ClimaRoute+</h1>
            <Link to="/map">Go to Map</Link>
        </div>
    );
}

export default Home;
