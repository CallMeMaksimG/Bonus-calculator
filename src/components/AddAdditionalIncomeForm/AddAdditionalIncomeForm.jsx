import { useState } from 'react';
import Preloader from '../Preloader/Preloader';
import './AddAdditionalIncomeForm.scss';

function AddAdditionalIncomeForm({
    setDisabledFormAdditionalIncome,
    setHideButtons,
    isLoading,
    date,
    setIsLoading,
    userId,
    additionalIncome,
    setAdditionalIncome,
}) {
    const [source, setSource] = useState('');
    const [sumIncome, setSumIncome] = useState('');

    const addAdditionalIncomeHandler = (event) => {
        event.preventDefault();
        const newAdditionalIncome = {
            employee_id: userId,
            source: source,
            sumIncome: sumIncome,
            month: date.getMonth(),
            year: date.getFullYear(),
        };
        setAdditionalIncome([...additionalIncome, newAdditionalIncome]);
        setDisabledFormAdditionalIncome(false);  
        setHideButtons(false);
    };
    return (
        <div className="add-sale__form-wrapper form-wrapper">
            {isLoading && <Preloader />}
            <form onSubmit={addAdditionalIncomeHandler} className="form">
                <label htmlFor="item">Источник: </label>
                <input
                    className="form__input"
                    type="text"
                    name="item"
                    placeholder="Введите источник дохода"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    required
                />
                <label htmlFor="price">Сумма к выплате:</label>
                <input
                    className="form__input"
                    type="number"
                    name="price"
                    placeholder="Введите сумму к выплате"
                    value={sumIncome}
                    onChange={(e) => setSumIncome(e.target.value)}
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
