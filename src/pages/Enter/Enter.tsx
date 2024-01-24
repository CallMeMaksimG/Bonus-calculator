import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Info from '../../components/Info/Info';
import Preloader from '../../components/Preloader/Preloader';
import './Enter.scss';
import { EnterProps } from './Enter.props';

const Enter = ({
    showInfo,
    setShowInfo,
    setUserId,
    isLoading,
    setIsLoading,
}: EnterProps): JSX.Element => {
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
    const navigate = useNavigate();
    useEffect(() => {
        if (loginError || passwordError) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [loginError, passwordError]);

    const loginHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setLogin(e.target.value);
        if (e.target.value === ' ') {
            setLoginError('Некорректный логин');
        } else {
            setLoginError('');
        }
    };

    const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (e.target.value === ' ') {
            setPasswordError('Некорректный пароль');
        } else {
            setPasswordError('');
        }
    };

    const blurHandler = (e: ChangeEvent<HTMLInputElement>) => {
        switch (e.target.name) {
            case 'login':
                setLoginDirty(true);
                break;
            case 'password':
                setPasswordDirty(true);
                break;
        }
    };

    const onSubmitHandler = async (event: FormEvent) => {
        try {
            event.preventDefault();
            setIsLoading(true);
            let formData = new FormData();
            formData.append('login', login);
            formData.append('password', password);

            await axios({
                method: 'get',
                baseURL: 'http://f0883110.xsph.ru',
                url: '/auth.php?login=' + login + '&password=' + password,
                data: formData,
            }).then((response) => {
                if (response.data !== null) {
                    localStorage.setItem(
                        'user',
                        `${response.data.employee_id}`
                    );
                    setUserId(response.data.employee_id);
                    navigate('/');
                } else {
                    setLoginError('Пользователь не найден');
                }
            });
        } catch (error) {
            alert('Ошибка при запросе данных');
            console.error(error);
        }
        setIsLoading(false);
    };
    return (
        <>
            {showInfo && (
                <Info
                    text="Регистрация прошла успешно!"
                    setShowInfo={setShowInfo}
                />
            )}
            <main className="auth">
                {isLoading && <Preloader />}
                <h3 className="title-3">Авторизация</h3>
                <form onSubmit={onSubmitHandler} className="auth__form">
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
                        className={
                            passwordDirty && passwordError ? 'error' : ''
                        }
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
            </main>
        </>
    );
};

export default Enter;
