import { useState } from 'react';
import './AddSaleForm.scss';

function AddSaleForm({ sales, setSales, date, setDisabledForm }) {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [percent, setPercent] = useState('');
    const [idSale, setIdSale] = useState(1);
    const interestCalculation = (price, percent) => (price / 100) * percent;

    const addSalesHandler = (title, price, percent) => {
        const newSale = {
            id: idSale,
            title,
            price,
            percent,
            bonus: interestCalculation(price, percent),
            month: date.getMonth(),
            year: date.getFullYear(),
        };
        setSales([...sales, newSale]);
        setIdSale(idSale + 1);
        setDisabledForm(false);
    };
    const onSubmitHandler = (event) => {
        event.preventDefault();
        addSalesHandler(title, price, percent);
        setTitle('');
        setPrice('');
        setPercent('');
    };
    return (
        <form onSubmit={onSubmitHandler} className="add-sale__form">
            <label htmlFor="item">Наименование: </label>
            <input
                className="add-sale__form-input"
                type="text"
                name="item"
                placeholder="Введите название товара"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="price">Цена:</label>
            <input
                className="add-sale__form-input"
                type="number"
                name="price"
                placeholder="Введите цену"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <fieldset>
                <legend>Процент:</legend>
                <div className="add-sale__form-radio">
                    <input
                        className="add-sale__form-radio-btn"
                        id="one-percent"
                        type="radio"
                        name="radio"
                        value="1"
                        checked={percent == '1' ? true : false}
                        onChange={(e) => setPercent(e.target.value)}
                    />{' '}
                    <label
                        htmlFor="one-percent"
                        className="add-sale__form-radio-label"
                    >
                        1%
                    </label>
                </div>
                <div className="add-sale__form-radio">
                    <input
                        className="add-sale__form-radio-btn"
                        id="three-percent"
                        type="radio"
                        name="radio"
                        value="3"
                        checked={percent == '3' ? true : false}
                        onChange={(e) => setPercent(e.target.value)}
                    />{' '}
                    <label
                        htmlFor="three-percent"
                        className="add-sale__form-radio-label"
                    >
                        3%
                    </label>
                </div>
            </fieldset>
            <button className="add-sale__form-btn" type="submit">
                Добавить
            </button>
        </form>
    );
}

export default AddSaleForm;
