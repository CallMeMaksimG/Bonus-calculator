import DateInput from '../../components/DateInput/DateInput';
import AddSaleForm from '../../components/AddSaleForm/AddSaleForm';
import SalesTable from '../../components/SalesTable/SalesTable';
import TotalResultAtMonth from '../../components/TotalResultAtMonth/TotalResultAtMonth';
import './Home.scss';

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
    userId
}) {
    return (
        <main className="main">
            <section className="add-sale">
                <DateInput startDate={startDate} setStartDate={setStartDate} />
                <button
                    className="add-sale-btn"
                    onClick={() => setDisabledForm(disabledForm ? false : true)}
                >
                    Добавить
                </button>
                {disabledForm && (
                    <AddSaleForm
                        setDisabledForm={setDisabledForm}
                        date={startDate}
                        sales={sales}
                        setSales={setSales}
                        setChangeArray={setChangeArray}
                    />
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
                    />
                )}
                {salesThisYearAndMonth.length > 0 && (
                    <TotalResultAtMonth array={salesThisYearAndMonth} />
                )}
            </section>
        </main>
    );
}

export default Home;
