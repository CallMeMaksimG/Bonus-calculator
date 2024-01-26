import { IAdditionalIncome, ISale } from '../../App';

export interface TotalResultAtMonthProps {
    array: ISale[];
    additionalIncomeThisYearAndMonth: IAdditionalIncome[];
}