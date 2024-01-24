import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Preloader from '../../components/Preloader/Preloader';
import './Registration.scss';
import { RegistrationProps } from './Registration.props';

function Registraton({
    setShowInfo,
    isLoading,
    setIsLoading,
}: RegistrationProps): JSX.Element {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [loginDirty, setLoginDirty] = useState<boolean>(false);
    const [passwordDirty, setPasswordDirty] = useState<boolean>(false);
    const [confirmPasswordDirty, setConfirmPasswordDirty] =
        useState<boolean>(false);
    const [loginError, setLoginError] = useState<string>(
        'Поле обязательно для заполнения'
    );
    const [passwordError, setPasswordError] = useState<string>(
        'Поле обязательно для заполнения'
    );
    const [confirmPasswordError, setConfirmPasswordError] = useState<string>(
        'Поле обязательно для заполнения'
    );
    const [formValid, setFormValid] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (loginError || passwordError || confirmPasswordError) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [loginError, passwordError, confirmPasswordError]);

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

    const confirmPasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
        if (e.target.value !== password) {
            setConfirmPasswordError('Пароли не совпадают');
        } else {
            setConfirmPasswordError('');
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
            case 'confirmPassword':
                setConfirmPasswordDirty(true);
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
                url: '/reg.php?login=' + login,
                data: formData,
            }).then((response) => {
                if (response.data === null) {
                    try {
                        axios.request({
                            method: 'post',
                            baseURL: 'http://f0883110.xsph.ru',
                            url: '/reg.php?login=' + login,
                            data: formData,
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
