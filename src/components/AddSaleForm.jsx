import './AddSaleForm.scss';

function AddSaleForm() {
    return (
        <form className="add-sale__form">
            <label htmlFor="item">Наименование: </label>
            <input
                className="add-sale__form-input"
                type="text"
                name="item"
                placeholder="Введите название товара"
            />
            <label htmlFor="">Цена:</label>
            <input
                className="add-sale__form-input"
                type="number"
                name="item"
                placeholder="Введите цену"
            />
            <fieldset>
                <legend>Процент:</legend>
                <div>
                    <input
                        className="add-sale__form-radio"
                        type="radio"
                        name="radio"
                        value="1"
                    />{' '}
                    <label className="radio-label">1%</label>
                </div>
                <div>
                    <input
                        className="add-sale__form-radio"
                        type="radio"
                        name="radio"
                        value="3"
                    />{' '}
                    <label className="radio-label">3%</label>
                </div>
            </fieldset>
            <button className="add-sale__form-btn" type="submit">Добавить</button>
        </form>
    );
}

export default AddSaleForm;
