"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";


export default function DateRangePicker() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const formatDate = (date) => (date ? format(date, "MMM dd, yyyy") : "");

  return (
    <div className="relative inline-block">
      <DatePicker
        selected={startDate}
        onChange={handleChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        monthsShown={2}
        dateFormat="MMM dd, yyyy"
        popperPlacement="bottom-start"
        customInput={
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-md text-sm bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <CalendarDays className="w-5 h-5 text-gray-500" />
            <span className="text-gray-700 text-xs">
              {startDate && endDate
                ? `${formatDate(startDate)} – ${formatDate(endDate)}`
                : "Select date range"}
            </span>
          </button>
        }
      />
    </div>
  );
}