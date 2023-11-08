function SalesTable({ percent, array, startDate }) {
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
                        startDate.getFullYear() === sale.year &&
                        startDate.getMonth() === sale.month
                )
                .map((sale) => {
                    return (
                        <tbody>
                            <tr>
                                <td>{sale.title}</td>
                                <td>{sale.price} &#8381;</td>
                                <td>{sale.bonus} &#8381;</td>
                            </tr>
                        </tbody>
                    );
                })}
            <tfoot>
                <tr>
                    <td>Итого</td>
                    <td>{array.reduce(
                            (acc, curentValue) => acc + Number(curentValue.price),
                            0
                        )}{' '}
                        &#8381;</td>
                    <td>
                        {array.reduce(
                            (acc, curentValue) => acc + curentValue.bonus,
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
