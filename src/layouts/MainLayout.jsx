import React from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Header from '../components/Header/Header';

const MainLayout = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    const loadApp = () => {
        setIsLoaded(true);
    };

    setTimeout(loadApp, 1200);

    return (
        <>
            <Link to="/" aria-label="Переход на главную страницу">
                <Header isLoaded={isLoaded} />
            </Link>
            {isLoaded && <Outlet />}
        </>
    );
};

export default MainLayout;
