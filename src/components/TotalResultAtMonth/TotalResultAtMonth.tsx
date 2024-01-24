import { TotalResultAtMonthProps } from './TotalResultAtMonth.props';
import './TotalResultAtMonth.scss';

const totalCalculator = (arr: [number], key: string) => {
    return arr.reduce(
        (acc, curentValue) => Math.round(acc + Number(curentValue[key])),
        0
    );
};
const TotalResultAtMonth = ({ array, additionalIncomeThisYearAndMonth }: TotalResultAtMonthProps) => {
    return (
        <div className="total-result">
            <div className="total-result__sales">
                <p>Итоговая сумма продаж за месяц</p>
                <span>
                    {totalCalculator(array, 'price').toLocaleString()} &#8381;
                </span>
            </div>
            <div className="total-result__bonus">
                <p>К выплате %</p>
                <span>
                    {totalCalculator(array, 'bonus').toLocaleString()} &#8381;
                </span>
            </div>
            <div className="total-result__total">
                <p>Итого к выплате за месяц</p>
                <span>
                    {(
                        totalCalculator(additionalIncomeThisYearAndMonth, 'sum') +
                        totalCalculator(array, 'bonus')
                    ).toLocaleString()}{' '}
                    &#8381;
                </span>
            </div>
        </div>
    );
};

export default TotalResultAtMonth;
