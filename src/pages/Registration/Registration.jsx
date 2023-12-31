import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Preloader from '../../components/Preloader/Preloader';
import './Registration.scss';

function Registraton({ setShowInfo, isLoading, setIsLoading }) {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loginDirty, setLoginDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [confirmPasswordDirty, setConfirmPasswordDirty] = useState(false);
    const [loginError, setLoginError] = useState(
        'Поле обязательно для заполнения'
    );
    const [passwordError, setPasswordError] = useState(
        'Поле обязательно для заполнения'
    );
    const [confirmPasswordError, setConfirmPasswordError] = useState(
        'Поле обязательно для заполнения'
    );
    const [formValid, setFormValid] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (loginError || passwordError || confirmPasswordError) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [loginError, passwordError, confirmPasswordError]);

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

    const confirmPasswordHandler = (e) => {
        setConfirmPassword(e.target.value);
        if (e.target.value !== password) {
            setConfirmPasswordError('Пароли не совпадают');
        } else {
            setConfirmPasswordError('');
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
            case 'confirmPassword':
                setConfirmPasswordDirty(true);
                break;
        }
    };

    const onSubmitHandler = async (event) => {
        try {
            event.preventDefault();
            setIsLoading(true);
            let formData = new FormData();
            formData.append('login', login);
            formData.append('password', password);

            await axios({
                method: 'get',
                baseURL: 'http://f0883110.xsph.ru',
                url: '/reg.php?login=' + login,
                data: formData,
            }).then((response) => {
                if (response.data === null) {
                    try {
                        axios({
                            method: 'post',
                            baseURL: 'http://f0883110.xsph.ru',
                            url: '/reg.php?login=' + login,
                            data: formData,
                            config: {
                                headers: {
                                    'Content-type': 'multipart/form-data',
                                },
                            },
                        });
                    } catch (error) {
                        alert('Ошибка при запросе данных');
                        console.error(error);
                    }

                    setShowInfo(true);
                    navigate('/login');
                } else {
                    setLoginError(
                        'Пользователь с таким логином уже существует'
                    );
                }
            });
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    };

    return (
        <main className="registration">
            {isLoading && <Preloader />}
            <h3 className="title-3">Регистрация</h3>
            <form onSubmit={onSubmitHandler} className="registration__form">
                <label htmlFor="login">Логин</label>
                {loginDirty && loginError && (
                    <div className="registration__form-error">{loginError}</div>
                )}
                <input
                    onBlur={(e) => blurHandler(e)}
                    onChange={(e) => loginHandler(e)}
                    className={loginDirty && loginError ? 'error' : ''}
                    type="text"
                    placeholder="Придумайте логин"
                    name="login"
                    value={login}
                />
                <label htmlFor="password">Пароль</label>
                {passwordDirty && passwordError && (
                    <div className="registration__form-error">
                        {passwordError}
                    </div>
                )}
                <input
                    onBlur={(e) => blurHandler(e)}
                    onChange={(e) => passwordHandler(e)}
                    className={passwordDirty && passwordError ? 'error' : ''}
                    type="password"
                    placeholder="Придумайте пароль"
                    name="password"
                    value={password}
                />
                <label htmlFor="confirmPassword">Повторите пароль</label>
                {confirmPasswordDirty && confirmPasswordError && (
                    <div className="registration__form-error">
                        {confirmPasswordError}
                    </div>
                )}
                <input
                    onBlur={(e) => blurHandler(e)}
                    onChange={(e) => confirmPasswordHandler(e)}
                    className={
                        confirmPasswordDirty && confirmPasswordError
                            ? 'error'
                            : ''
                    }
                    type="password"
                    placeholder="Введите пароль еще раз"
                    name="confirmPassword"
                    value={confirmPassword}
                />
                <button disabled={!formValid} type="submit">
                    Зарегистрироваться
                </button>
            </form>
        </main>
    );
}

export default Registraton;
