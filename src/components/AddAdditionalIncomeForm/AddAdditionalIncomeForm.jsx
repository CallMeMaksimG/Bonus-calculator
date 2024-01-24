import { useState, useContext } from 'react';
import axios from 'axios';
import Preloader from '../Preloader/Preloader';
import './AddAdditionalIncomeForm.scss';
import { AppContext } from '../../context/app.context';

function AddAdditionalIncomeForm({
    setDisabledFormAdditionalIncome,
    setHideButtons,
}) {
    const [source, setSource] = useState('');
    const [sumIncome, setSumIncome] = useState('');

    const {
        isLoading,
        startDate,
        setIsLoading,
        userId,
        additionalIncome,
        setChangeArray,
    } = useContext(AppContext);

    const onSubmitHandler = async (event) => {
        try {
            event.preventDefault();
            setIsLoading(true);
            setSource('');
            setSumIncome('');

            let formData = new FormData();
            formData.append('employee_id', userId);
            formData.append('source', source);
            formData.append('sum', sumIncome);
            formData.append('month', startDate.getMonth());
            formData.append('year', startDate.getFullYear());

            await axios({
                method: 'post',
                baseURL: 'http://f0883110.xsph.ru',
                url: '/additionalIncomes.php',
                data: formData,
                config: {
                    headers: { 'Content-type': 'multipart/form-data' },
                },
            });
            setChangeArray([additionalIncome]);
            setDisabledFormAdditionalIncome(false);
            setHideButtons(false);
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    };
    return (
        <div className="add-sale__form-wrapper form-wrapper">
            {isLoading && <Preloader />}
            <form onSubmit={onSubmitHandler} className="form">
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
                <button className="form__btn" type="submit">
                    Добавить
                </button>
            </form>
        </div>
    );
}

export default AddAdditionalIncomeForm;
