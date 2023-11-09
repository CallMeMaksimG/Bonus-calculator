import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Auth = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [loginDirty, setLoginDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [loginError, setLoginError] = useState(
        'Поле обязательно для заполнения'
    );
    const [passwordError, setPasswordError] = useState(
        'Поле обязательно для заполнения'
    );
    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        if (loginError || passwordError) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [loginError, passwordError]);

    const loginHandler = (e) => {
        setLogin(e.target.value);
        if (e.target.value === ' ') {
            setLoginError('Некорректный логин');
        } else {
            setLoginError('');
        }
    };

    const passwordHandler = (e) => {
        setPassword(e.target.value);
        if (e.target.value === ' ') {
            setPasswordError('Некорректный пароль');
        } else {
            setPasswordError('');
        }
    };

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'login':
                setLoginDirty(true);
                break;
            case 'password':
                setPasswordDirty(true);
                break;
        }
    };
    return (
        <div className="auth">
            <h3 className="title-3">Авторизация</h3>
            <form className="auth__form">
                <label htmlFor="login">Логин</label>
                {loginDirty && loginError && (
                    <div className="login__form-error">{loginError}</div>
                )}
                <input
                    onBlur={(e) => blurHandler(e)}
                    onChange={(e) => loginHandler(e)}
                    className={loginDirty && loginError ? 'error' : ''}
                    type="text"
                    placeholder="Введите логин"
                    name="login"
                    value={login}
                />
                <label htmlFor="password">Пароль</label>
                {passwordDirty && passwordError && (
                    <div className="login__form-error">{passwordError}</div>
                )}
                <input
                    onBlur={(e) => blurHandler(e)}
                    onChange={(e) => passwordHandler(e)}
                    className={passwordDirty && passwordError ? 'error' : ''}
                    type="password"
                    placeholder="Введите пароль"
                    name="password"
                    value={password}
                />
                <button disabled={!formValid} type="submit">
                    Войти
                </button>
            </form>
            <Link to="../registration" className="auth__link">
                Регистрация
            </Link>
        </div>
    );
};

export default Auth;
