import { useState } from 'react';
import axios from 'axios';
import './AddSaleForm.scss';
import Preloader from '../Preloader/Preloader';

function AddSaleForm({
    sales,
    setSales,
    date,
    setDisabledForm,
    setHideButtons,
    setChangeArray,
    userId,
    isLoading,
    setIsLoading,
}) {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [percent, setPercent] = useState('');
    const interestCalculation = (price, percent) => {
        if (percent === '7701') {
            return Math.round((Number(price) / 100) * 1);
        } else {
            return Math.round((Number(price) / 100) * Number(percent));
        }
    };

    const addSalesHandler = (userId, title, price, percent) => {
        const newSale = {
            employee_id: userId,
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
        setHideButtons(false);
    };
    const onSubmitHandler = async (event) => {
        try {
            event.preventDefault();
            setIsLoading(true);
            setTitle('');
            setPrice('');
            setPercent('');

            let formData = new FormData();
            formData.append('employee_id', userId);
            formData.append('title', title);
            formData.append('price', price);
            formData.append('percent', percent);
            formData.append('bonus', interestCalculation(price, percent));
            formData.append('month', date.getMonth());
            formData.append('year', date.getFullYear());

            await axios({
                method: 'post',
                baseURL: 'http://f0883110.xsph.ru',
                url: '/sales.php',
                data: formData,
                config: {
                    headers: { 'Content-type': 'multipart/form-data' },
                },
            });
            addSalesHandler(title, price, percent);
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    };
    return (
        <div className="add-sale__form-wrapper">
            {isLoading && <Preloader />}
            <form onSubmit={onSubmitHandler} className="add-sale__form">
                <label htmlFor="item">Наименование: </label>
                <input
                    className="add-sale__form-input"
                    type="text"
                    name="item"
                    placeholder="Введите название товара"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <label htmlFor="price">Цена:</label>
                <input
                    className="add-sale__form-input"
                    type="number"
                    name="price"
                    placeholder="Введите цену"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <div>
                    <fieldset className="add-sale__form-radio-wrapper">
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
                                required
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
                        <div className="add-sale__form-radio">
                            <input
                                className="add-sale__form-radio-btn"
                                id="special-percent"
                                type="radio"
                                name="radio"
                                value="7701"
                                checked={percent == '7701' ? true : false}
                                onChange={(e) => setPercent(e.target.value)}
                            />{' '}
                            <label
                                htmlFor="special-percent"
                                className="add-sale__form-radio-label"
                            >
                                7701
                            </label>
                        </div>
                    </fieldset>
                </div>
                <button className="add-sale__form-btn" type="submit">
                    Добавить
                </button>
            </form>
        </div>
    );
}

export default AddSaleForm;
