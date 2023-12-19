import './AdditionalIncomeTable.scss';

function AdditionalIncomeTable({additionalIncome, startDate, totalCalculator}) {
    console.log(additionalIncome)
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
                {additionalIncome
                    .filter(
                        (source) =>
                            startDate.getFullYear() === Number(source.year) &&
                            startDate.getMonth() === Number(source.month)
                    )
                    .map((source) => {
                        return (
                            <tr
                                key={source.additionalIncome_id}
                                // data-id={sale.sales_id}
                                // onClick={onClickSaleItem}
                            >
                                <td>{source.source}</td>
                                <td>{Number((source.sumIncome)).toLocaleString()}&nbsp;&#8381;</td>
                            </tr>
                        );
                    })}
            </tbody>
            <tfoot>
                    <tr>
                        <td>Итого</td>
                        <td>{totalCalculator(additionalIncome, 'sumIncome')}&nbsp;&#8381;</td>
                    </tr>
                </tfoot>
        </table>
    );
}

export default AdditionalIncomeTable;
