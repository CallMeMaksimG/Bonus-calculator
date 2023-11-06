import { useState } from 'react';
import './App.css';
import AddSaleForm from './components/AddSaleForm';
import DateInput from './components/DateInput';


function App() {
  const [disabledForm, setDisabledForm] = useState(false);
    return (
        <div className="App">
            <div className="container">
                <DateInput />
                <button className="add-sale-btn" onClick={() => setDisabledForm(disabledForm ? false : true)}>Добавить</button>
                {disabledForm && <AddSaleForm />}
            </div>
        </div>
    );
}

export default App;
