import { IAdditionalIncome, ISale } from '../../App';

export interface HomeProps {
    startDate?: Date,
    setStartDate?: (date: Date) => void,
    disabledForm?: boolean,
    setDisabledForm?: (value: boolean) => void,
    saleAtOnePercent?: ISale[],
    saleAtThreePercent?: ISale[],
    saleAtSpecialCategory?: ISale[],
    additionalIncomeThisYearAndMonth?: IAdditionalIncome[];
    salesThisYearAndMonth?: ISale[];
}