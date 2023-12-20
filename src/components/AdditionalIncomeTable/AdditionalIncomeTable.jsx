import { useState, useEffect } from 'react';
import axios from 'axios';
import Preloader from '../Preloader/Preloader';
import './AdditionalIncomeTable.scss';

function AdditionalIncomeTable({
    additionalIncome,
    setAdditionalIncome,
    startDate,
    totalCalculator,
    additionalIncomeThisYearAndMonth,
    isLoading,
    setIsLoading,
    setChangeArray
}) {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalItemInfo, setModalItemInfo] = useState([]);

    const onClickadditionalIncomeItem = async (e) => {
        try {
            setModalOpen(true);
            setIsLoading(true);
            const additionalIncomeItem = e.target.parentNode;
            const additionalIncomeItemId = additionalIncomeItem.dataset.id;
            let formData = new FormData();
            formData.append('addictional_income_id', additionalIncomeItemId);

            await axios({
                method: 'get',
                baseURL: 'http://f0883110.xsph.ru',
                url: '/additionalIncome.php/?additional_income_id=' + additionalIncomeItemId,
                data: formData,
            }).then((result) => {
                setModalItemInfo(result.data);
            });
        } catch (error) {
            alert('Ошибка при запросе данных');
            console.error(error);
        }
        setIsLoading(false);
        setAdditionalIncome([...additionalIncome, additionalIncome]);
    };

    const onClickDeleteBtn = async (id) => {
        try {
            setIsLoading(true);
            id = modalItemInfo.additional_income_id;
            let formData = new FormData();
            formData.append('additional_income_id', id);

            await axios({
                method: 'post',
                baseURL: 'http://f0883110.xsph.ru',
                url: `/additionalIncome.php/?additional_income_id=${id}`,
                data: formData,
                config: {
                    headers: { 'Content-type': 'multipart/form-data' },
                },
            });
        } catch (error) {
            alert('Ошибка при запросе данных');
            console.error(error);
        }
        setAdditionalIncome(additionalIncome.filter((income) => income.additional_income_id !== id));
        setIsLoading(false);
        setModalOpen(false);
        setChangeArray(true);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (event.target.className.includes('overlay overlay--open')) {
                setModalOpen(false);
            }
        };
        document.body.addEventListener('click', handleClickOutside);

        return () => {
            document.body.removeEventListener('click', handleClickOutside);
        };
    }, []);
    return (
        <>
                <>
                    <div className={modalOpen ? "overlay overlay--open" : "overlay"}></div>
                    <div className={modalOpen ? "modal-addictional-income modal-addictional-income--open" : "modal-addictional-income"}>
                        <button onClick={() => setModalOpen(!modalOpen)} className='modal-addictional-income__close-btn'><img src="./../img/close.svg" alt="close" /></button>
                        {isLoading && <Preloader />}
                        <div
                            key={modalItemInfo.addictional_income_id}
                            className="modal-addictional-income__item-info"
                        >
                            <h3>{modalItemInfo.source}</h3>
                            <p>
                                <span>К выплате:</span> {modalItemInfo.sum}
                                &nbsp;&#8381;
                            </p>
                        </div>
                        <div className="modal-addictional-income__buttons">
                            <button
                                onClick={() => setModalOpen(false)}
                                className="modal-addictional-income__buttons-close"
                            >
                                Закрыть
                            </button>
                            <button
                                onClick={onClickDeleteBtn}
                                className="modal-addictional-income__buttons-delete"
                            >
                                Удалить
                            </button>
                        </div>
                    </div>
                </>
            <table className="additional-income-table">
                <caption>Дополнительный доход</caption>
                <thead>
                    <tr>
                        <th>Источник дохода</th>
                        <th>К выплате</th>
                    </tr>
                </thead>
                <tbody>
                    {additionalIncomeThisYearAndMonth
                        .filter(
                            (source) =>
                                startDate.getFullYear() ===
                                    Number(source.year) &&
                                startDate.getMonth() === Number(source.month)
                        )
                        .map((source) => {
                            return (
                                <tr
                                    key={source.additional_income_id}
                                    data-id={source.additional_income_id}
                                    onClick={onClickadditionalIncomeItem}
                                >
                                    <td>{source.source}</td>
                                    <td>
                                        {Number(source.sum).toLocaleString()}
                                        &nbsp;&#8381;
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
                <tfoot>
                    <tr>
                        <td>Итого</td>
                        <td>
                            {totalCalculator(
                                additionalIncomeThisYearAndMonth,
                                'sum'
                            )}
                            &nbsp;&#8381;
                        </td>
                    </tr>
                </tfoot>
            </table>
        </>
    );
}

export default AdditionalIncomeTable;
