const TotalResultAtMonth = ({ array }) => {
    return (
        <div className="total-result">
            <div className="total-result__sales">
                <p>Итоговая сумма продаж за месяц</p>
                <span>
                    {array.reduce(
                        (acc, curentValue) =>
                            Math.round(acc + Number(curentValue.price)),
                        0
                    )}{' '}
                    &#8381;
                </span>
            </div>
            <div className="total-result__bonus">
                <p>К выплате %</p>
                <span>
                    {array.reduce(
                        (acc, curentValue) =>
                            Math.round(acc + Number(curentValue.bonus)),
                        0
                    )}{' '}
                    &#8381;
                </span>
            </div>
        </div>
    );
};

export default TotalResultAtMonth;
