import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import AddSaleForm from './components/AddSaleForm';
import DateInput from './components/DateInput';
import SalesTable from './components/SalesTable';
import Auth from './components/Auth';
import Registraton from './components/Registration';

function App() {
    const [disabledForm, setDisabledForm] = useState(false);
    const [sales, setSales] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    // const [salesThisYearAndMonth, setSalesThisYearAndMonth] = useState([])
    console.log(sales);
    useEffect(() => {
        async function fetchData() {
            const salesResponse = await axios.get(
                'https://654ccf6577200d6ba8597655.mockapi.io/sales'
            );
            // console.log(salesResponse.data);
            setSales(salesResponse.data);
          }
          
          fetchData();
        }, []);
        
        const salesThisYearAndMonth = sales.filter(
            (sale) =>
                sale.year == startDate.getFullYear() &&
                sale.month == startDate.getMonth()
        );
    
        console.log(salesThisYearAndMonth + 'this month');
        const saleAtOnePercent = salesThisYearAndMonth.filter(
            (sale) => Number(sale.percent) === 1
        );
        const saleAtThreePercent = salesThisYearAndMonth.filter(
            (sale) => Number(sale.percent) === 3
        );
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
                                            <div
                                                style={{
                                                    marginTop: '30px',
                                                    marginBottom: '30px',
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent:
                                                            'space-between',
                                                    }}
                                                >
                                                    <p>
                                                        Итоговая сумма продаж за
                                                        месяц
                                                    </p>
                                                    <span>
                                                        {salesThisYearAndMonth.reduce(
                                                            (
                                                                acc,
                                                                curentValue
                                                            ) =>
                                                                Math.round(
                                                                    acc +
                                                                        Number(
                                                                            curentValue.price
                                                                        )
                                                                ),
                                                            0
                                                        )}{' '}
                                                        &#8381;
                                                    </span>
                                                </div>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent:
                                                            'space-between',
                                                    }}
                                                >
                                                    <p>К выплате %</p>
                                                    <span>
                                                        {salesThisYearAndMonth.reduce(
                                                            (
                                                                acc,
                                                                curentValue
                                                            ) =>
                                                                Math.round(
                                                                    acc +
                                                                        Number(
                                                                            curentValue.bonus
                                                                        )
                                                                ),
                                                            0
                                                        )}{' '}
                                                        &#8381;
                                                    </span>
                                                </div>
                                            </div>
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
