import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Preloader from '../Preloader/Preloader';
import './SalesTable.scss';
import { AppContext, ISales } from '../../context/app.context';
import { totalCalculator } from '../../App';
import { SalesTableProps } from './SalesTable.props';

function SalesTable({ percent, array }: SalesTableProps): JSX.Element {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modalItemInfo, setModalItemInfo] = useState<any>([]);
    const {
        startDate,
        setChangeArray,
        sales,
        setSales,
        isLoading,
        setIsLoading,
    } = useContext(AppContext);
    const onClickSaleItem = async (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target instanceof HTMLElement) {
            try {
                setModalOpen(true);
                setIsLoading(true);

                const saleItem = (e.target as HTMLElement)
                    .parentNode as HTMLElement;
                const saleItemId = saleItem.dataset.id;
                let formData = new FormData();
                formData.append('sales_id', saleItemId);

                await axios({
                    method: 'get',
                    baseURL: 'http://f0883110.xsph.ru',
                    url: '/sale.php/?sales_id=' + saleItemId,
                    data: formData,
                }).then((result) => {
                    setModalItemInfo(result.data);
                });
            } catch (error) {
                alert('Ошибка при запросе данных');
                console.error(error);
            }
            setIsLoading(false);
            // setSales([...sales, sales]);
        }
    };

    const onClickReturnBtn = async (id) => {
        try {
            setIsLoading(true);
            id = modalItemInfo.sales_id;
            let formData = new FormData();
            formData.append('sales_id', id);

            await axios({
                method: 'post',
                baseURL: 'http://f0883110.xsph.ru',
                url: `/sale.php/?sales_id=${id}`,
                data: formData,
            });
        } catch (error) {
            alert('Ошибка при запросе данных');
            console.error(error);
        }
        setSales(sales.filter((sale) => sale.sales_id !== id));
        setIsLoading(false);
        setModalOpen(false);
        setChangeArray(true);
    };

    useEffect(() => {
        const handleClickOutside = (event: Event) => {
            if (
                (event.target as HTMLElement).className.includes(
                    'overlay overlay--open'
                )
            ) {
                setModalOpen(false);
            }
        };
        document.body.addEventListener('click', handleClickOutside);

        return () => {
            document.body.removeEventListener('click', handleClickOutside);
        };
    }, []);
    const bonusCalculation = (price: number, percent: string): number => {
        if (percent === '7701') {
            return Math.round((Number(price) / 100) * 1);
        } else {
            return Math.round((Number(price) / 100) * Number(percent));
        }
    };

    return (
        <>
            <>
                <div
                    className={modalOpen ? 'overlay overlay--open' : 'overlay'}
                ></div>
                <div
                    className={
                        modalOpen ? 'modal-sale modal-sale--open' : 'modal-sale'
                    }
                >
                    <button
                        onClick={() => setModalOpen(!modalOpen)}
                        className="modal-sale__close-btn"
                    >
                        <img src="./../img/close.svg" alt="close" />
                    </button>
                    {isLoading && <Preloader />}
                    <div
                        key={modalItemInfo.sales_id}
                        className="modal-sale__item-info"
                    >
                        <h3>{modalItemInfo.title}</h3>
                        <p>
                            <span>Цена</span> {modalItemInfo.price}
                            &nbsp;&#8381;
                        </p>
                        <p>
                            <span>К выплате</span> {modalItemInfo.bonus}
                            &nbsp;&#8381;
                        </p>
                    </div>
                    <div className="modal-sale__buttons">
                        <button
                            onClick={() => setModalOpen(false)}
                            className="modal-sale__buttons-close"
                        >
                            Закрыть
                        </button>
                        <button
                            onClick={onClickReturnBtn}
                            className="modal-sale__buttons-return"
                        >
                            Возврат
                        </button>
                    </div>
                </div>
            </>

            <table className="sales__table">
                <caption>
                    {percent !== '7701' ? `${percent} %` : percent}
                </caption>
                <thead>
                    <tr>
                        <th>Наименование</th>
                        <th>Цена</th>
                        <th>К выплате</th>
                    </tr>
                </thead>
                <tbody>
                    {array
                        .filter(
                            (sale: ISales) =>
                                startDate.getFullYear() === Number(sale.year) &&
                                startDate.getMonth() === Number(sale.month)
                        )
                        .map((sale: ISales) => {
                            return (
                                <tr
                                    key={sale.sales_id}
                                    data-id={sale.sales_id}
                                    onClick={onClickSaleItem}
                                >
                                    <td>{sale.title}</td>
                                    <td>
                                        {Number(sale.price).toLocaleString()}
                                        &nbsp;&#8381;
                                    </td>
                                    <td>
                                        {Number(
                                            bonusCalculation(
                                                sale.price,
                                                sale.percent
                                            )
                                        ).toLocaleString()}
                                        &nbsp;&#8381;
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
                <tfoot>
                    <tr>
                        <td>Итого</td>
                        <td>{totalCalculator(array, 'price')}&nbsp;&#8381;</td>
                        <td>{totalCalculator(array, 'bonus')}&nbsp;&#8381;</td>
                    </tr>
                </tfoot>
            </table>
        </>
    );
}

export default SalesTable;
