import React from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';

const MainLayout = () => {
    return (
        <>
            <Link to="/"><Header /></Link>
            <Outlet />
        </>
    );
};

export default MainLayout;