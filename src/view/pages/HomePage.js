import React from 'react';
import { Link } from 'react-router-dom';
import { routePaths } from '../../routes';

const HomePage = () => {
    return (
        <div>
            <Link to={routePaths.playPage}>Start</Link>
        </div>
    );
};

export default HomePage;
