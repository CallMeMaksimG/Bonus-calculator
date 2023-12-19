import DateInput from '../../components/DateInput/DateInput';
import { useState } from 'react';
import AddSaleForm from '../../components/AddSaleForm/AddSaleForm';
import AddAdditionalIncomeForm from '../../components/AddAdditionalIncomeForm/AddAdditionalIncomeForm';
import SalesTable from '../../components/SalesTable/SalesTable';
import TotalResultAtMonth from '../../components/TotalResultAtMonth/TotalResultAtMonth';
import './Home.scss';
import AdditionalIncomeTable from '../../components/AdditionalIncomeTable/AdditionalIncomeTable';

function Home({
    startDate,
    setStartDate,
    disabledForm,
    setDisabledForm,
    sales,
    setSales,
    saleAtOnePercent,
    saleAtThreePercent,
    salesThisYearAndMonth,
    setChangeArray,
    userId,
    isLoading,
    setIsLoading,
    additionalIncome,
    setAdditionalIncome,
}) {
    const [addButtons, setAddButtons] = useState(false);
    const [disabledFormAdditionalIncome, setDisabledFormAdditionalIncome] =
        useState(false);
    const totalCalculator = (arr, key) => {
        return arr
            .reduce(
                (acc, curentValue) =>
                    Math.round(acc + Number(curentValue[key])),
                0
            )
            .toLocaleString();
    };
    return (
        <main className="main">
            <section className="add-sale">
                <DateInput startDate={startDate} setStartDate={setStartDate} />
                <button
                    onClick={() => setAddButtons(!addButtons)}
                    className="add-btn"
                >
                    Добавить
                </button>
                {addButtons && (
                    <div>
                        <button
                            className="add-sale-btn add-btn"
                            onClick={() =>
                                setDisabledForm(disabledForm ? false : true)
                            }
                        >
                            Продажа
                        </button>
                        {disabledForm && (
                            <AddSaleForm
                                setDisabledForm={setDisabledForm}
                                date={startDate}
                                sales={sales}
                                setSales={setSales}
                                setChangeArray={setChangeArray}
                                userId={userId}
                                isLoading={isLoading}
                                setIsLoading={setIsLoading}
                            />
                        )}
                        <button
                            onClick={() =>
                                setDisabledFormAdditionalIncome(
                                    !disabledFormAdditionalIncome
                                )
                            }
                            className="add-income-btn add-btn"
                        >
                            Доп. доход
                        </button>
                        {disabledFormAdditionalIncome && (
                            <AddAdditionalIncomeForm
                                date={startDate}
                                userId={userId}
                                additionalIncome={additionalIncome}
                                setAdditionalIncome={setAdditionalIncome}
                            />
                        )}
                    </div>
                )}
            </section>

            <section className="sales">
                {saleAtOnePercent.length > 0 && (
                    <SalesTable
                        sales={sales}
                        setSales={setSales}
                        percent="1"
                        array={saleAtOnePercent}
                        startDate={startDate}
                        setChangeArray={setChangeArray}
                        userId={userId}
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                        totalCalculator={totalCalculator}
                    />
                )}
                {saleAtThreePercent.length > 0 && (
                    <SalesTable
                        sales={sales}
                        setSales={setSales}
                        percent="3"
                        array={saleAtThreePercent}
                        startDate={startDate}
                        setChangeArray={setChangeArray}
                        userId={userId}
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                        totalCalculator={totalCalculator}
                    />
                )}
                {additionalIncome.length > 0 && (
                    <AdditionalIncomeTable
                        additionalIncome={additionalIncome}
                        startDate={startDate}
                        totalCalculator={totalCalculator}
                    />
                )}

                {salesThisYearAndMonth.length > 0 && (
                    <TotalResultAtMonth array={salesThisYearAndMonth} additionalIncome={additionalIncome}/>
                )}
            </section>
        </main>
    );
}

export default Home;
