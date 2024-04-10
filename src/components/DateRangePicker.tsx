import React, { useEffect, useState } from "react";
import "./DateRangePicker.css";

interface DateRangePickerProps {
  onChange: (
    startDate: Date,
    endDate: Date,
    weekdays: Date[],
    weekends: Date[]
  ) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ onChange }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [months, setMonths] = useState<Date[]>([]);

  useEffect(() => {
    const newMonths: Date[] = [];
    for (let month = 0; month < 12; month++) {
      newMonths.push(new Date(selectedYear, month));
    }
    setMonths(newMonths);
  }, [selectedYear]);

  const handleDateChange = (date: Date) => {
    console.log("handleDateChange", date);
    if (!startDate) {
      setStartDate(date);
      setEndDate(null);
    } else if (!endDate && date >= startDate) {
      setEndDate(date);
    } else {
      setStartDate(date);
      setEndDate(null);
    }
  };

  const getWeekdayDates = (start: Date, end: Date): Date[] => {
    const weekdays: Date[] = [];
    const currentDate = new Date(start);
    while (currentDate <= end) {
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        weekdays.push(new Date(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return weekdays;
  };

  const getWeekendDates = (start: Date, end: Date): Date[] => {
    const weekends: Date[] = [];
    const currentDate = new Date(start);
    while (currentDate <= end) {
      if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
        weekends.push(new Date(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return weekends;
  };

  const handleApply = () => {
    if (startDate && endDate) {
      const weekdays = getWeekdayDates(startDate, endDate);
      const weekends = getWeekendDates(startDate, endDate);
      onChange(startDate, endDate, weekdays, weekends);
    }
  };

  const renderCalendar = () => {
    const totalMonths = months.length;
    const monthsPerRow = 5;

    const numRows = Math.ceil(totalMonths / monthsPerRow);
    const calendarRows = [];
    for (let i = 0; i < numRows; i++) {
      const startIndex = i * monthsPerRow;
      const endIndex = Math.min(startIndex + monthsPerRow, totalMonths);
      const rowMonths = months.slice(startIndex, endIndex);
      const rowElements = rowMonths.map((month, index) => (
        <div key={startIndex + index} className="month">
          {renderMonth(month)}
        </div>
      ));
      calendarRows.push(
        <div key={i} className="calendar-row">
          {rowElements}
        </div>
      );
    }

    return <div className="calendar">{calendarRows}</div>;
  };

  const renderMonth = (month: Date) => {
    const daysInMonth: JSX.Element[] = [];
    const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
    const lastDay = new Date(month.getFullYear(), month.getMonth() + 1, 0);
    const daysInWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    for (let i = 0; i < firstDay.getDay(); i++) {
      daysInMonth.push(<div key={`empty-${i}`} className="empty"></div>);
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      const currentDate = new Date(month.getFullYear(), month.getMonth(), i);
      daysInMonth.push(
        <div
          key={i}
          onClick={() => handleDateChange(currentDate)}
          className={getDayClassName(currentDate)}
        >
          {i}
        </div>
      );
    }

    return (
      <div className="month">
        <h3>
          {month.toLocaleString("default", { month: "long", year: "numeric" })}
        </h3>
        <div className="days-in-week">
          {daysInWeek.map((day, index) => (
            <div key={index} className="weekday">
              {day}
            </div>
          ))}
        </div>
        <div className="days-in-month">{daysInMonth}</div>
      </div>
    );
  };

  const getDayClassName = (date: Date): string => {
    if (startDate && endDate && date >= startDate && date <= endDate) {
      if (date.getDay() === 0 || date.getDay() === 6) {
        return "weekend disabled";
      }
      return "selected";
    }
    return date.getDay() === 0 || date.getDay() === 6 ? "weekend" : "day";
  };

  return (
    <div>
      <div className="header">
        <select
          className="year_select"
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
        >
          {Array.from({ length: 10 }, (_, index) => (
            <option key={index} value={new Date().getFullYear() - index}>
              {new Date().getFullYear() - index}
            </option>
          ))}
        </select>
        <div></div>
      </div>
      {renderCalendar()}
      <p>Click Here to display Weekdays and Weekend days</p>
      <button className="apply_button" onClick={handleApply}>
        Apply
      </button>
    </div>
  );
};

export default DateRangePicker;
