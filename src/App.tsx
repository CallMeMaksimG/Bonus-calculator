import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home/Home';
import Enter from './pages/Enter/Enter';
import Registraton from './pages/Registration/Registration';
import './App.scss';
import { AppContext } from './context/app.context';

export interface ISale {
    bonus: string;
    employee_id: string;
    month: string;
    percent: string;
    price: string;
    sales_id: string;
    title: string;
    year: string;
}

export interface IAdditionalIncome {
    additional_income_id: string;
    employee_id: string;
    month: string;
    source: string;
    sum: string;
    year: string;
}

export const totalCalculator = (arr: [], key: string) => {
    return arr
        .reduce(
            (acc, curentValue) => Math.round(acc + Number(curentValue[key])),
            0
        )
        .toLocaleString();
};

function App() {
    const [disabledForm, setDisabledForm] = useState(false);
    const [sales, setSales] = useState([]);
    const [additionalIncome, setAdditionalIncome] = useState([]);
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
        async function fetchData() {
            try {
                let formData = new FormData();
                formData.append('userId', userId);
                await axios({
                    method: 'get',
                    baseURL: 'http://f0883110.xsph.ru',
                    url: `/additionalIncomes.php?employee_id=${userId}`,
                    data: formData,
                }).then((response) => {
                    if (response.data !== null) {
                        setAdditionalIncome(response.data);
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

    const salesThisYearAndMonth: ISale[] = sales.filter(
        (sale) =>
            Number(sale.year) === startDate.getFullYear() &&
            Number(sale.month) === startDate.getMonth()
    );
    const saleAtOnePercent: ISale[] = salesThisYearAndMonth.filter(
        (sale) => sale.percent === '1'
    );
    const saleAtThreePercent: ISale[] = salesThisYearAndMonth.filter(
        (sale) => sale.percent === '3'
    );

    const saleAtSpecialCategory: ISale[] = salesThisYearAndMonth.filter(
        (sale) => sale.percent === '7701'
    );

    const additionalIncomeThisYearAndMonth = additionalIncome.filter(
        (additionalIncome) =>
            Number(additionalIncome.year) === startDate.getFullYear() &&
            Number(additionalIncome.month) === startDate.getMonth()
    );
    return (
        <AppContext.Provider
            value={{
                startDate,
                disabledForm,
                setDisabledForm,
                sales,
                setSales,
                additionalIncome,
                setAdditionalIncome,
                setChangeArray,
                userId,
                isLoading,
                setIsLoading,
            }}
        >
            <div className="App">
                <div className="container">
                    <Routes>
                        <Route path="/" element={<MainLayout />}>
                            <Route
                                index
                                element={
                                    <Home
                                        setStartDate={setStartDate}
                                        saleAtOnePercent={saleAtOnePercent}
                                        saleAtThreePercent={saleAtThreePercent}
                                        salesThisYearAndMonth={
                                            salesThisYearAndMonth
                                        }
                                        saleAtSpecialCategory={
                                            saleAtSpecialCategory
                                        }
                                        additionalIncomeThisYearAndMonth={
                                            additionalIncomeThisYearAndMonth
                                        }
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
        </AppContext.Provider>
    );
}

export default App;
