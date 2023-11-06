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
            <label htmlFor="price">Цена:</label>
            <input
                className="add-sale__form-input"
                type="number"
                name="price"
                placeholder="Введите цену"
            />
            <fieldset>
                <legend>Процент:</legend>
                <div className="add-sale__form-radio">
                    <input
                        className="add-sale__form-radio-btn"
                        id="one-percent"
                        type="radio"
                        name="radio"
                        value="1"
                    />{' '}
                    <label htmlFor="one-percent" className="add-sale__form-radio-label">
                        1%
                    </label>
                </div>
                <div className="add-sale__form-radio">
                    <input
                        className="add-sale__form-radio-btn"
                        id="three-percent"
                        type="radio"
                        name="radio"
                        value="3"
                    />{' '}
                    <label htmlFor="three-percent" className="add-sale__form-radio-label">
                        3%
                    </label>
                </div>
            </fieldset>
            <button className="add-sale__form-btn" type="submit">
                Добавить
            </button>
        </form>
    );
}

export default AddSaleForm;
