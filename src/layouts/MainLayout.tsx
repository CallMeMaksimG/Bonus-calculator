import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Header from '../components/Header/Header';

const MainLayout = (): JSX.Element => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

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
