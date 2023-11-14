import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Enter from './pages/Enter/Enter';
import Registraton from './pages/Registration/Registration';
import './App.scss';

function App() {
    const [disabledForm, setDisabledForm] = useState(false);
    const [sales, setSales] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [changeArray, setChangeArray] = useState([]);
    const [showInfo, setShowInfo] = useState(false);
    const [userId, setUserId] = useState(localStorage.getItem('user'));
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchData() {
            try {
                let formData = new FormData();
                formData.append('userId', userId);
                const salesResponse = await axios({
                    method: 'get',
                    url: `http://localhost:8888/bonus-calculator/sales.php?employee_id=${userId}`,
                    data: formData,
                });
                console.log(salesResponse);
                setSales(salesResponse.data);
            } catch (error) {
                alert('Ошибка при запросе данных');
                console.error(error);
            }
        }
        fetchData();
    }, [changeArray, userId]);

    useEffect(() => {
        userId === null ? navigate('/login') : navigate('/');
    }, [userId]);

    const salesThisYearAndMonth = sales.filter(
        (sale) =>
            Number(sale.year) === startDate.getFullYear() &&
            Number(sale.month) === startDate.getMonth()
    );
    const saleAtOnePercent = salesThisYearAndMonth.filter(
        (sale) => sale.percent === '1'
    );
    const saleAtThreePercent = salesThisYearAndMonth.filter(
        (sale) => sale.percent === '3'
    );
    return (
        <>
            <div className="App">
                <div className="container">
                    <Link to="/">
                        <Header />
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
                                    setChangeArray={setChangeArray}
                                    userId={userId}
                                />
                            }
                        ></Route>
                        <Route
                            path="login"
                            element={
                                <Enter
                                    showInfo={showInfo}
                                    setShowInfo={setShowInfo}
                                    setUserId={setUserId}
                                />
                            }
                        ></Route>
                        <Route
                            path="registration"
                            element={
                                <Registraton
                                    showInfo={showInfo}
                                    setShowInfo={setShowInfo}
                                />
                            }
                        ></Route>
                    </Routes>
                </div>
            </div>
        </>
    );
}

export default App;
