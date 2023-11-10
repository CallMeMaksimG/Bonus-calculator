import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Home from './pages/Home/Home';
import Enter from './pages/Enter/Enter';
import Registraton from './pages/Registration/Registration';

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
                                <Home
                                    startDate={startDate}
                                    setStartDate={setStartDate}
                                    disabledForm={disabledForm}
                                    setDisabledForm={setDisabledForm}
                                    sales={sales}
                                    setSales={setSales}
                                    saleAtOnePercent={saleAtOnePercent}
                                    saleAtThreePercent={saleAtThreePercent}
                                    salesThisYearAndMonth={
                                        salesThisYearAndMonth
                                    }
                                />
                            }
                        ></Route>
                        <Route path="login" element={<Enter />}></Route>
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
