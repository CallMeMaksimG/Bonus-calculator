import { HeaderProps } from './Header.props';
import './Header.scss';

function Header({ isLoaded }: HeaderProps): JSX.Element {
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
