import { TotalResultAtMonthProps } from './TotalResultAtMonth.props';
import './TotalResultAtMonth.scss';

const totalCalculator = (arr: [], key: string): number => {
    return arr.reduce(
        (acc, curentValue) => Math.round(acc + Number(curentValue[key])),
        0
    );
};
const TotalResultAtMonth = ({
    array,
    additionalIncomeThisYearAndMonth,
}: TotalResultAtMonthProps): JSX.Element => {
    return (
        <div className="total-result">
            <div className="total-result__sales">
                <p>Итоговая сумма продаж за месяц</p>
                <span>
                    {totalCalculator(array as [], 'price').toLocaleString()} &#8381;
                </span>
            </div>
            <div className="total-result__bonus">
                <p>К выплате %</p>
                <span>
                    {totalCalculator(array as [], 'bonus').toLocaleString()} &#8381;
                </span>
            </div>
            <div className="total-result__total">
                <p>Итого к выплате за месяц</p>
                <span>
                    {(
                        totalCalculator(
                            additionalIncomeThisYearAndMonth as [],
                            'sum'
                        ) + totalCalculator(array as [], 'bonus')
                    ).toLocaleString()}{' '}
                    &#8381;
                </span>
            </div>
        </div>
    );
};

export default TotalResultAtMonth;
