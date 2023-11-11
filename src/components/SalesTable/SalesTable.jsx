import { useState } from 'react';
import './SalesTable.scss';

function SalesTable({ percent, array, startDate }) {
    const [modalOpen, setModalOpen] = useState(false);
    const onClickSaleItem = (e) => {
        setModalOpen(true);
        // console.log(e.target.parentNode);
        const saleItem = e.target.parentNode;
        const saleTitle = saleItem.querySelector('title');
        console.log(saleItem);
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
                        <div className="modal-sale__item-info">
                            <p>New Balance 990v3 JJJJound</p>
                            <p>
                                <span>Цена</span> 58900 &#8381;
                            </p>
                            <p>
                                <span>К выплате</span> 589 &#8381;
                            </p>
                        </div>
                        <div className="modal-sale__buttons">
                            <button
                                onClick={() => setModalOpen(false)}
                                className="modal-sale__buttons-close"
                            >
                                Закрыть
                            </button>
                            <button className="modal-sale__buttons-return">
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
