import './Header.scss';

function Header({ isLoaded }) {
    return (
        <header className={isLoaded ? 'header' : 'header header--loaded'}>
            <img
                className="header__logo"
                src="../img/logo.svg"
                alt="LOGO"
            ></img>
        </header>
    );
}

export default Header;
