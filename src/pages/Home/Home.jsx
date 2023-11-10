import DateInput from '../../components/DateInput';
import AddSaleForm from '../../components/AddSaleForm';
import SalesTable from '../../components/SalesTable';
import TotalResultAtMonth from '../../components/TotalResultAtMonth';

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
                    />
                )}
            </section>

            <section className="sales">
                {saleAtOnePercent.length > 0 && (
                    <SalesTable
                        percent="1"
                        array={saleAtOnePercent}
                        startDate={startDate}
                    />
                )}
                {saleAtThreePercent.length > 0 && (
                    <SalesTable
                        percent="3"
                        array={saleAtThreePercent}
                        startDate={startDate}
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
