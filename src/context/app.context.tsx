import { createContext } from 'react';
import { IAdditionalIncome } from '../App';

export interface ISales {
    sales_id: string;
    employee_id: string;
    title: string;
    price: number;
    percent: string;
    bonus: number;
    month: number;
    year: number;
}

export interface AppContextProps {
    startDate?: Date;
    disabledForm?: boolean;
    setDisabledForm?: (state: boolean) => void;
    sales?: ISales[];
    setSales?: (sales: ISales[]) => void;
    additionalIncome?: any[];
    setAdditionalIncome?: (value: IAdditionalIncome[]) => void;
    setChangeArray?: (array: any) => void;
    userId?: string;
    isLoading?: boolean;
    setIsLoading?: (state: boolean) => void;
}

export const AppContext = createContext<AppContextProps>({});
