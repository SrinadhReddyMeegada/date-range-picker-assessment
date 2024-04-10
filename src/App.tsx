import React, { useState } from "react";
import "./App.css";
import DateRangePicker from "./components/DateRangePicker";

function App() {
  const [selectedRange, setSelectedRange] = useState<[Date, Date] | null>(null);
  const [weekendDates, setWeekendDates] = useState<Date[]>([]);
  const [weekdayDates, setWeekdayDates] = useState<Date[]>([]);
  const handleDateRangeChange = (
    startDate: Date,
    endDate: Date,
    weekends: Date[],
    weekdays: Date[]
  ) => {
    setSelectedRange([startDate, endDate]);
    setWeekendDates(weekends);
    setWeekdayDates(weekdays);
  };
  console.log("weekends", selectedRange);
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="App">
      <h1>Date Range Picker Demo</h1>
      <DateRangePicker onChange={handleDateRangeChange} />
      {selectedRange && (
        <div>
          <h2>Selected Date Range:</h2>
          <p>Start Date: {formatDate(selectedRange[0])}</p>
          <p>End Date: {formatDate(selectedRange[1])}</p>
        </div>
      )}
      {weekendDates.length > 0 && (
        <div>
          <h2>weekday Dates:</h2>
          <ul>
            {weekendDates.map((date, index) => (
              <li key={index}>{formatDate(date)}</li>
            ))}
          </ul>
        </div>
      )}
      {weekdayDates.length > 0 && (
        <div>
          <h2>Weekend Dates:</h2>
          <ul>
            {weekdayDates.map((date, index) => (
              <li key={index}>{formatDate(date)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
