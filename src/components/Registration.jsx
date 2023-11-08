function Registraton() {
    return (
        <div className="registration">
            <h3 className="title-3">Регистрация</h3>
            <form className="registration__form">
                <label htmlFor="">Логин</label>
                <input type="text" placeholder="Придумайте логин" />
                <label htmlFor="">Пароль</label>
                <input type="password" placeholder="Придумайте пароль" />
                <label htmlFor="">Повторите пароль</label>
                <input type="password" placeholder="Введите пароль еще раз" />
                <button type="submit">Зарегистрироваться</button>
            </form>
        </div>
    );
}


export default Registraton;