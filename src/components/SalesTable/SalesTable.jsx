import './SalesTable.scss';

function SalesTable({ percent, array, startDate }) {
    const interestCalculation = (price, percent) =>
        Math.round((Number(price) / 100) * Number(percent));
    return (
        <table className="sales__table">
            <caption>{percent} %</caption>
            <thead>
                <tr>
                    <th>Наименование</th>
                    <th>Цена</th>
                    <th>К выплате</th>
                </tr>
            </thead>
            {array
                .filter(
                    (sale) =>
                        startDate.getFullYear() === Number(sale.year) &&
                        startDate.getMonth() === Number(sale.month)
                )
                .map((sale) => {
                    return (
                        <tbody>
                            <tr>
                                <td>{sale.title}</td>
                                <td>{sale.price} &#8381;</td>
                                <td>
                                    {interestCalculation(
                                        sale.price,
                                        sale.percent
                                    )}{' '}
                                    &#8381;
                                </td>
                            </tr>
                        </tbody>
                    );
                })}
            <tfoot>
                <tr>
                    <td>Итого</td>
                    <td>
                        {array.reduce(
                            (acc, curentValue) =>
                                Math.round(acc + Number(curentValue.price)),
                            0
                        )}{' '}
                        &#8381;
                    </td>
                    <td>
                        {array.reduce(
                            (acc, curentValue) =>
                                Math.round(acc + Number(curentValue.bonus)),
                            0
                        )}{' '}
                        &#8381;
                    </td>
                </tr>
            </tfoot>
        </table>
    );
}

export default SalesTable;
