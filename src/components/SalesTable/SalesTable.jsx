import { useState } from 'react';
import axios from 'axios';
import './SalesTable.scss';

function SalesTable({
    percent,
    array,
    startDate,
    returned,
    setReturned,
    setSales,
}) {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalItemInfo, setModalItemInfo] = useState([]);
    const onClickSaleItem = (e) => {
        setModalOpen(true);
        const saleItem = e.target.parentNode;
        const saleItemId = saleItem.dataset.id;

        let formData = new FormData();
        formData.append('sales_id', saleItemId);
        async function fetchData() {
            try {
                axios({
                    method: 'get',
                    url:
                        'http://localhost:8888/bonus-calculator/sale.php/?sales_id=' +
                        saleItemId,
                    data: formData,
                }).then((result) => setModalItemInfo(result.data));
            } catch (error) {
                alert('Ошибка при запросе данных');
                console.error(error);
            }
        }
        fetchData();
    };

    const onClickReturnBtn = () => {
        let saleItemId = '';
        modalItemInfo.forEach((sale) => (saleItemId = sale.sales_id));
        console.log(saleItemId);
        let formData = new FormData();
        formData.append('sales_id', saleItemId);
        formData.append('returns', 1);
        async function fetchData() {
            try {
                await axios({
                    method: 'post',
                    url:
                        'http://localhost:8888/bonus-calculator/sale.php/?sales_id=' +
                        saleItemId,
                    data: formData,
                    config: {
                        headers: { 'Content-type': 'multipart/form-data' },
                    },
                });
            } catch (error) {
                alert('Ошибка при запросе данных');
                console.error(error);
            }
        }
        fetchData();
        setModalOpen(false);
    };
    const totalCalculator = (arr, key) => {
        return arr
            .filter((sale) => sale.returns === '0')
            .reduce(
                (acc, curentValue) =>
                    Math.round(acc + Number(curentValue[key])),
                0
            )
            .toLocaleString();
    };
    const bonusCalculation = (price, percent) =>
        Math.round((Number(price) / 100) * Number(percent));
    return (
        <>
            {modalOpen && (
                <>
                    <div className="overlay"></div>
                    <div className="modal-sale">
                        {modalItemInfo.map((item) => {
                            return (
                                <div
                                    key={item.sales_id}
                                    className="modal-sale__item-info"
                                >
                                    <p>{item.title}</p>
                                    <p>
                                        <span>Цена</span> {item.price} &#8381;
                                    </p>
                                    <p>
                                        <span>К выплате</span> {item.bonus}{' '}
                                        &#8381;
                                    </p>
                                </div>
                            );
                        })}

                        <div className="modal-sale__buttons">
                            <button
                                onClick={() => setModalOpen(false)}
                                className="modal-sale__buttons-close"
                            >
                                Закрыть
                            </button>
                            <button
                                onClick={onClickReturnBtn}
                                className="modal-sale__buttons-return"
                            >
                                Возврат
                            </button>
                        </div>
                    </div>
                </>
            )}

            <table className="sales__table">
                <caption>{percent} %</caption>
                <thead>
                    <tr>
                        <th>Наименование</th>
                        <th>Цена</th>
                        <th>К выплате</th>
                    </tr>
                </thead>
                <tbody>
                    {array
                        .filter(
                            (sale) =>
                                startDate.getFullYear() === Number(sale.year) &&
                                startDate.getMonth() === Number(sale.month)
                        )
                        .map((sale) => {
                            return (
                                <tr
                                    className={
                                        sale.returns === '1' ? 'returns' : ''
                                    }
                                    key={sale.sales_id}
                                    data-id={sale.sales_id}
                                    onClick={onClickSaleItem}
                                >
                                    <td>{sale.title}</td>
                                    <td>{sale.price} &#8381;</td>
                                    <td>
                                        {bonusCalculation(
                                            sale.price,
                                            sale.percent
                                        )}{' '}
                                        &#8381;
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
                <tfoot>
                    <tr>
                        <td>Итого</td>
                        <td>
                            {totalCalculator(array, 'price')}
                            &#8381;
                        </td>
                        <td>
                            {totalCalculator(array, 'bonus')}
                            &#8381;
                        </td>
                    </tr>
                </tfoot>
            </table>
        </>
    );
}

export default SalesTable;
