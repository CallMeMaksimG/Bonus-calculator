import DateInput from '../../components/DateInput/DateInput';
import { useState, useEffect } from 'react';
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
    additionalIncomeThisYearAndMonth,
}) {
    const [hideButtons, setHideButtons] = useState(false);
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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                event.target.className.includes(
                    'add-btns-wrapper__overlay add-btns-wrapper__overlay--open'
                )
            ) {
                setHideButtons(false);
                setDisabledForm(false);
                setDisabledFormAdditionalIncome(false);
            }
        };
        document.body.addEventListener('click', handleClickOutside);

        return () => {
            document.body.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <main className="main">
            <section className="add-sale">
                <DateInput startDate={startDate} setStartDate={setStartDate} />
                <button
                    onClick={() => setHideButtons(!hideButtons)}
                    className="add-btn"
                >
                    Добавить
                </button>
                <>
                    <div
                        className={
                            hideButtons
                                ? 'add-btns-wrapper__overlay add-btns-wrapper__overlay--open'
                                : 'add-btns-wrapper__overlay'
                        }
                    ></div>
                    <div
                        className={
                            hideButtons
                                ? 'add-btns-wrapper add-btns-wrapper--open'
                                : 'add-btns-wrapper'
                        }
                    >
                        <button
                            onClick={() => {
                                setHideButtons(!hideButtons);
                                setDisabledForm(false);
                                setDisabledFormAdditionalIncome(false);
                            }}
                            className="add-btns-wrapper__close-btn"
                        >
                            <img src="./../img/close.svg" alt="close" />
                        </button>
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
                                setHideButtons={setHideButtons}
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
                                setDisabledFormAdditionalIncome={
                                    setDisabledFormAdditionalIncome
                                }
                                setHideButtons={setHideButtons}
                                date={startDate}
                                userId={userId}
                                additionalIncome={additionalIncome}
                                setAdditionalIncome={setAdditionalIncome}
                                isLoading={isLoading}
                                setIsLoading={setIsLoading}
                                setChangeArray={setChangeArray}
                            />
                        )}
                    </div>
                </>
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
                {additionalIncomeThisYearAndMonth.length > 0 && (
                    <AdditionalIncomeTable
                        additionalIncome={additionalIncome}
                        startDate={startDate}
                        totalCalculator={totalCalculator}
                        additionalIncomeThisYearAndMonth={
                            additionalIncomeThisYearAndMonth
                        }
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                        setAdditionalIncome={setAdditionalIncome}
                        setChangeArray={setChangeArray}
                    />
                )}

                {(salesThisYearAndMonth.length > 0 ||
                    additionalIncomeThisYearAndMonth.length > 0) && (
                    <TotalResultAtMonth
                        array={salesThisYearAndMonth}
                        additionalIncomeThisYearAndMonth={
                            additionalIncomeThisYearAndMonth
                        }
                    />
                )}
            </section>
        </main>
    );
}

export default Home;
