import { Link } from "react-router-dom";

const Auth = () => {
    return (
        <div className="auth">
            <h3 className="title-3">Авторизация</h3>
            <form className="auth__form">
                <label htmlFor="">Логин</label>
                <input type="text" placeholder="Введите логин" />
                <label htmlFor="">Пароль</label>
                <input type="password" placeholder="Введите пароль" />
                <button type="submit">Войти</button>
            </form>
            <Link to="../registration" className="auth__link">Регистрация</Link>
        </div>
    );
};

export default Auth;
