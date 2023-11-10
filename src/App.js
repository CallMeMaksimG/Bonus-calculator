import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import AddSaleForm from './components/AddSaleForm';
import DateInput from './components/DateInput';
import SalesTable from './components/SalesTable';
import Auth from './components/Auth';
import Registraton from './components/Registration';
import TotalResultAtMonth from './components/TotalResultAtMonth';

function App() {
    const [disabledForm, setDisabledForm] = useState(false);
    const [sales, setSales] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    // console.log(sales);
    useEffect(() => {
        async function fetchData() {
            try {
                const salesResponse = await axios.get(
                    'http://localhost:8888/bonus-calculator/sales.php'
                );
                // console.log(salesResponse.data);
                setSales(salesResponse.data);
            } catch (error) {
                alert('Ошибка при запросе данных');
                console.error(error);
            }
        }

        fetchData();
    }, []);

    const salesThisYearAndMonth = sales.filter(
        (sale) =>
            Number(sale.year) === startDate.getFullYear() &&
            Number(sale.month) === startDate.getMonth()
    );

    console.log(salesThisYearAndMonth + 'this month');
    const saleAtOnePercent = salesThisYearAndMonth.filter(
        (sale) => sale.percent === '1'
    );
    console.log(saleAtOnePercent);
    const saleAtThreePercent = salesThisYearAndMonth.filter(
        (sale) => sale.percent === '3'
    );
    // console.log(saleAtThreePercent)
    // console.log(saleAtOnePercent)
    // console.log(saleAtThreePercent);
    return (
        <BrowserRouter>
            <div className="App">
                <div className="container">
                    <Link to="/">
                        <header className="header">
                            <img src="../img/logo.svg"></img>
                        </header>
                    </Link>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <main className="main">
                                    <section className="add-sale">
                                        <DateInput
                                            startDate={startDate}
                                            setStartDate={setStartDate}
                                        />
                                        <button
                                            className="add-sale-btn"
                                            onClick={() =>
                                                setDisabledForm(
                                                    disabledForm ? false : true
                                                )
                                            }
                                        >
                                            Добавить
                                        </button>
                                        {disabledForm && (
                                            <AddSaleForm
                                                setDisabledForm={
                                                    setDisabledForm
                                                }
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
                                            <TotalResultAtMonth
                                                array={salesThisYearAndMonth}
                                            />
                                        )}
                                    </section>
                                </main>
                            }
                        ></Route>
                        <Route path="login" element={<Auth />}></Route>
                        <Route
                            path="registration"
                            element={<Registraton />}
                        ></Route>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
