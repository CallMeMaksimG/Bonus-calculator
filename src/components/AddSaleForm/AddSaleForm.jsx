import { useState, useEffect } from 'react';
import axios from 'axios';
import './AddSaleForm.scss';

function AddSaleForm({
    sales,
    setSales,
    date,
    setDisabledForm,
    setChangeArray,
}) {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [percent, setPercent] = useState('');
    const interestCalculation = (price, percent) =>
        Math.round((Number(price) / 100) * Number(percent));

    const addSalesHandler = (title, price, percent) => {
        const newSale = {
            employee_id: 1,
            title,
            price,
            percent,
            bonus: interestCalculation(price, percent),
            month: date.getMonth(),
            year: date.getFullYear(),
        };
        setSales([...sales, newSale]);
        setChangeArray([sales]);
        setDisabledForm(false);
    };
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        addSalesHandler(title, price, percent);
        setTitle('');
        setPrice('');
        setPercent('');

        let formData = new FormData();
        formData.append('employee_id', 1);
        formData.append('title', title);
        formData.append('price', price);
        formData.append('percent', percent);
        formData.append('bonus', interestCalculation(price, percent));
        formData.append('month', date.getMonth());
        formData.append('year', date.getFullYear());
        await axios({
            method: 'post',
            url: 'http://localhost:8888/bonus-calculator/sales.php',
            data: formData,
            config: { headers: { 'Content-type': 'multipart/form-data' } },
        })
            // .then(function (response) {
            //     console.log(response);
            // })
            .catch(function (error) {
                console.error(error);
            });
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
