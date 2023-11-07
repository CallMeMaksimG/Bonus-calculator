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
                    <table className="sales__table">
                        <thead>
                            <th>1%</th>
                        </thead>

                        <thead>
                            <td>Наименование</td>
                            <td>Цена</td>
                            <td>К выплате</td>
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
                                        <td>{sale.title}</td>
                                        <td>{sale.price} &#8381;</td>
                                        <td>{sale.bonus} &#8381;</td>
                                    </tbody>
                                );
                            })}
                    </table>
                </section>
            </div>
        </div>
    );
}

export default App;
