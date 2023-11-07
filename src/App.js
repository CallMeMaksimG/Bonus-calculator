import { useState } from 'react';
import './App.css';
import AddSaleForm from './components/AddSaleForm';
import DateInput from './components/DateInput';
import SalesTable from './components/SalesTable';

function App() {
    const [disabledForm, setDisabledForm] = useState(false);
    const [sales, setSales] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    // console.log(sales);
    const saleAtOnePercent = sales.filter((sale) => sale.percent === '1');
    const saleAtThreePercent = sales.filter((sale) => sale.percent === '3');
    // console.log(saleAtOnePercent)
    // console.log(saleAtThreePercent);
    return (
        <div className="App">
            <div className="container">
                <header className="header">
                    <img src="../img/logo.svg"></img>
                </header>
                <main className="main">
                    <section className="add-sale">
                        <DateInput
                            startDate={startDate}
                            setStartDate={setStartDate}
                        />
                        <button
                            className="add-sale-btn"
                            onClick={() =>
                                setDisabledForm(disabledForm ? false : true)
                            }
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
                </main>
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
                </section>
            </div>
        </div>
    );
}

export default App;
