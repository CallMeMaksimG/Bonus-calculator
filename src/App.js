import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainLayout from './layouts/MainLayout';
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
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchData() {
            try {
                let formData = new FormData();
                formData.append('userId', userId);
                await axios({
                    method: 'get',
                    baseURL: 'http://f0883110.xsph.ru',
                    url: `/sales.php?employee_id=${userId}`,
                    data: formData,
                }).then((response) => {
                    if (response.data !== null) {
                        setSales(response.data);
                    }
                });
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
                    <Routes>
                        <Route path="/" element={<MainLayout />}>
                            <Route
                                index
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
                                        isLoading={isLoading}
                                        setIsLoading={setIsLoading}
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
                                        isLoading={isLoading}
                                        setIsLoading={setIsLoading}
                                    />
                                }
                            ></Route>
                            <Route
                                path="registration"
                                element={
                                    <Registraton
                                        showInfo={showInfo}
                                        setShowInfo={setShowInfo}
                                        isLoading={isLoading}
                                        setIsLoading={setIsLoading}
                                    />
                                }
                            ></Route>
                        </Route>
                    </Routes>
                </div>
            </div>
        </>
    );
}

export default App;
