import { useState } from 'react';
import './App.css';
import AddSaleForm from './components/AddSaleForm';
import DateInput from './components/DateInput';

function App() {
    const [disabledForm, setDisabledForm] = useState(false);
    const [sales, setSales] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    console.log(sales);
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
                {sales.length > 0 && 
                    <table className="sales__table">
                        <caption>1%</caption>
                        <thead>
                            <tr>
                                <th>Наименование</th>
                                <th>Цена</th>
                                <th>К выплате</th>
                            </tr>
                        </thead>
                        {sales
                            .filter(
                                (sale) =>
                                    startDate.getFullYear() === sale.year &&
                                    startDate.getMonth() === sale.month &&
                                    sale.percent === '1'
                            )
                            .map((sale) => {
                                return (
                                    <tbody>
                                        <tr>
                                            <td>{sale.title}</td>
                                            <td>{sale.price} &#8381;</td>
                                            <td>{sale.bonus} &#8381;</td>
                                        </tr>
                                    </tbody>
                                );
                            })}
                        <tfoot>
                            <tr>
                              <td colSpan='2'>Итого</td>
                              <td>{sales.reduce((acc, curentValue) => acc + curentValue.bonus, 0)} &#8381;</td>
                            </tr>
                        </tfoot>
                    </table>
}
                </section>
            </div>
        </div>
    );
}

export default App;
