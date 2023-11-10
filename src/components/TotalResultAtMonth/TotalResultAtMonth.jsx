import './TotalResultAtMonth.scss';

const totalCalculator = (arr, key) => {
    return arr
        .reduce(
            (acc, curentValue) => Math.round(acc + Number(curentValue[key])),
            0
        )
        .toLocaleString();
};
const TotalResultAtMonth = ({ array }) => {
    return (
        <div className="total-result">
            <div className="total-result__sales">
                <p>Итоговая сумма продаж за месяц</p>
                <span>{totalCalculator(array, 'price')} &#8381;</span>
            </div>
            <div className="total-result__bonus">
                <p>К выплате %</p>
                <span>{totalCalculator(array, 'bonus')} &#8381;</span>
            </div>
        </div>
    );
};

export default TotalResultAtMonth;
