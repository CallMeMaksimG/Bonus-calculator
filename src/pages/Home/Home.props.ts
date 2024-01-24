export interface HomeProps {
    startDate: number,
    setStartDate: (date: number) => void,
    disabledForm: boolean,
    setDisabledForm: (value: boolean) => void,
}