import './AdditionalIncomeTable.scss';

function AdditionalIncomeTable({
    additionalIncome,
    startDate,
    totalCalculator,
    additionalIncomeThisYearAndMonth,
}) {
    return (
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
                            startDate.getFullYear() === Number(source.year) &&
                            startDate.getMonth() === Number(source.month)
                    )
                    .map((source) => {
                        return (
                            <tr
                                key={source.additional_income_id}
                                data-id={source.additional_income_id}
                                // onClick={onClickSaleItem}
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
                        {totalCalculator(additionalIncomeThisYearAndMonth, 'sum')}&nbsp;&#8381;
                    </td>
                </tr>
            </tfoot>
        </table>
    );
}

export default AdditionalIncomeTable;
