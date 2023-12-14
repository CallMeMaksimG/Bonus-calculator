import Preloader from '../Preloader/Preloader';
import './AddAdditionalIncomeForm.scss';

function AddAdditionalIncomeForm({ isLoading, setIsLoading }) {
    return (
        <div className="add-sale__form-wrapper form-wrapper">
            {isLoading && <Preloader />}
            <form onSubmit={''} className="form">
                <label htmlFor="item">Источник: </label>
                <input
                    className="form__input"
                    type="text"
                    name="item"
                    placeholder="Введите источник дохода"
                    value={''}
                    onChange={''}
                    required
                />
                <label htmlFor="price">Сумма к выплате:</label>
                <input
                    className="form__input"
                    type="number"
                    name="price"
                    placeholder="Введите сумму к выплате"
                    value={''}
                    onChange={''}
                    required
                />
                <div></div>
                <button className="form__btn" type="submit">
                    Добавить
                </button>
            </form>
        </div>
    );
}

export default AddAdditionalIncomeForm;
