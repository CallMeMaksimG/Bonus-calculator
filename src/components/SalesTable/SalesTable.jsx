import { useState } from 'react';
import axios from 'axios';
import './SalesTable.scss';

function SalesTable({
    percent,
    array,
    startDate,
    setChangeArray,
    sales,
    setSales,
    userId,
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
                    baseURL: 'http://f0883110.xsph.ru',
                    url: '/sale.php/?sales_id=' + saleItemId,
                    data: formData,
                }).then((result) => setModalItemInfo(result.data));
            } catch (error) {
                alert('Ошибка при запросе данных');
                console.error(error);
            }
        }
        fetchData();
        setSales([...sales, sales]);
    };

    const onClickReturnBtn = (id) => {
        modalItemInfo.forEach((sale) => (id = sale.sales_id));
        let formData = new FormData();
        formData.append('sales_id', id);
        async function fetchData() {
            try {
                await axios({
                    method: 'post',
                    baseURL: 'http://f0883110.xsph.ru',
                    url: `/sale.php/?sales_id=${id}`,
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
        setSales(sales.filter((sale) => sale.sales_id !== id));
        setModalOpen(false);
        setChangeArray(true);
    };
    const totalCalculator = (arr, key) => {
        return arr
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
                                        <span>Цена</span> {item.price}
                                        &nbsp;&#8381;
                                    </p>
                                    <p>
                                        <span>К выплате</span> {item.bonus}
                                        &nbsp;&#8381;
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
                                    key={sale.sales_id}
                                    data-id={sale.sales_id}
                                    onClick={onClickSaleItem}
                                >
                                    <td>{sale.title}</td>
                                    <td>{sale.price}&nbsp;&#8381;</td>
                                    <td>
                                        {bonusCalculation(
                                            sale.price,
                                            sale.percent
                                        )}
                                        &nbsp;&#8381;
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
                <tfoot>
                    <tr>
                        <td>Итого</td>
                        <td>{totalCalculator(array, 'price')}&nbsp;&#8381;</td>
                        <td>{totalCalculator(array, 'bonus')}&nbsp;&#8381;</td>
                    </tr>
                </tfoot>
            </table>
        </>
    );
}

export default SalesTable;
