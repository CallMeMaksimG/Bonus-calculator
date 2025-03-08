import DateInput from '../../components/DateInput/DateInput';
import { useState, useEffect, useContext } from 'react';
import AddSaleForm from '../../components/AddSaleForm/AddSaleForm';
import AddAdditionalIncomeForm from '../../components/AddAdditionalIncomeForm/AddAdditionalIncomeForm';
import SalesTable from '../../components/SalesTable/SalesTable';
import TotalResultAtMonth from '../../components/TotalResultAtMonth/TotalResultAtMonth';
import './Home.scss';
import AdditionalIncomeTable from '../../components/AdditionalIncomeTable/AdditionalIncomeTable';
import { AppContext } from '../../context/app.context';
import { HomeProps } from './Home.props';

function Home({
  setStartDate,
  saleAtOnePercent,
  saleAtThreePercent,
  saleAtFivePercent,
  saleAtSpecialCategory,
  additionalIncomeThisYearAndMonth,
  salesThisYearAndMonth,
}: HomeProps): JSX.Element {
  const { startDate, disabledForm, setDisabledForm, additionalIncome } =
    useContext(AppContext);
  const [hideButtons, setHideButtons] = useState(false);
  const [disabledFormAdditionalIncome, setDisabledFormAdditionalIncome] =
    useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        event.target.className.includes(
          'add-btns-wrapper__overlay add-btns-wrapper__overlay--open'
        )
      ) {
        setHideButtons(false);
        setDisabledForm(false);
        setDisabledFormAdditionalIncome(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <main className="main">
      <section className="add-sale">
        <DateInput startDate={startDate} setStartDate={setStartDate} />
        <button
          onClick={() => setHideButtons(!hideButtons)}
          className="add-btn"
        >
          Добавить
        </button>
        <>
          <div
            className={
              hideButtons
                ? 'add-btns-wrapper__overlay add-btns-wrapper__overlay--open'
                : 'add-btns-wrapper__overlay'
            }
          ></div>
          <div
            className={
              hideButtons
                ? 'add-btns-wrapper add-btns-wrapper--open'
                : 'add-btns-wrapper'
            }
          >
            <button
              onClick={() => {
                setHideButtons(!hideButtons);
                setDisabledForm(false);
                setDisabledFormAdditionalIncome(false);
              }}
              className="add-btns-wrapper__close-btn"
            >
              <img src="./../img/close.svg" alt="close" />
            </button>
            <button
              className="add-sale-btn add-btn"
              onClick={() => setDisabledForm(disabledForm ? false : true)}
            >
              Продажа
            </button>
            {disabledForm && <AddSaleForm setHideButtons={setHideButtons} />}
            <button
              onClick={() =>
                setDisabledFormAdditionalIncome(!disabledFormAdditionalIncome)
              }
              className="add-income-btn add-btn"
            >
              Доп. доход
            </button>

            {disabledFormAdditionalIncome && (
              <AddAdditionalIncomeForm
                setDisabledFormAdditionalIncome={
                  setDisabledFormAdditionalIncome
                }
                setHideButtons={setHideButtons}
              />
            )}
          </div>
        </>
      </section>

      <section className="sales">
        {saleAtOnePercent.length > 0 && (
          <SalesTable percent="1" array={saleAtOnePercent} />
        )}
        {saleAtThreePercent.length > 0 && (
          <SalesTable percent="3" array={saleAtThreePercent} />
        )}
        {saleAtFivePercent.length > 0 && (
          <SalesTable percent="5" array={saleAtFivePercent} />
        )}
        {saleAtSpecialCategory.length > 0 && (
          <SalesTable percent="7701" array={saleAtSpecialCategory} />
        )}
        {additionalIncomeThisYearAndMonth.length > 0 && (
          <AdditionalIncomeTable
            // additionalIncome={additionalIncome}
            additionalIncomeThisYearAndMonth={additionalIncomeThisYearAndMonth}
          />
        )}

        {(salesThisYearAndMonth.length > 0 ||
          additionalIncomeThisYearAndMonth.length > 0) && (
          <TotalResultAtMonth
            array={salesThisYearAndMonth}
            additionalIncomeThisYearAndMonth={additionalIncomeThisYearAndMonth}
          />
        )}
      </section>
    </main>
  );
}

export default Home;
