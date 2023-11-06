import { useState } from 'react';
import DatePicker from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import 'react-datepicker/dist/react-datepicker.css';
import buildLocalizeFn from 'date-fns/locale/_lib/buildLocalizeFn';
import '../index.scss';
  
  const monthValues = {
    narrow: ["Я", "Ф", "М", "А", "М", "И", "И", "А", "С", "О", "Н", "Д"],
    abbreviated: [
      "янв.",
      "фев.",
      "март",
      "апр.",
      "май",
      "июнь",
      "июль",
      "авг.",
      "сент.",
      "окт.",
      "нояб.",
      "дек."
    ],
    wide: [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь"
    ]
  };

  ru.localize.month = buildLocalizeFn({
    values: monthValues,
    defaultWidth: 'wide',
    defaultFormattingWidth: 'wide'
  })

const DateInput = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        dateFormat="MMMM  yyyy"
        showMonthYearPicker
        showFullMonthYearPicker
        locale={ru}
      />
    );
  };

export default DateInput;
