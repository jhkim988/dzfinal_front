import React, { useCallback, useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Paper } from "@mui/material";
import axios from "axios";

import { compareDate } from './../utils/dateUtils';

const ReservationDatePicker = ({
  pickDate,
  setPickDate,
  doctor,
}) => {
  const [impossible, setImpossible] = useState(new Set());
  const getImpossible = useCallback((doctor, year, month) => {
    axios.get("/api/reservation/impossible/day", {
      params: { doctor, year, month }
    }).then(({ data }) => {
      setImpossible(new Set(data));
    })
  }, [setImpossible]);
  
  const onMonthChange = ({ $y, $M }) => {
    getImpossible(doctor, $y, $M+1);
  }
  
  useEffect(() => {
    getImpossible(doctor, pickDate.getYear()+1900, pickDate.getMonth()+1);
  }, []);

  const shouldDisableDate = ({ $d }) => {
    const date = new Date($d);
    date.setTime(date.getTime() - date.getTimezoneOffset() * 60_000);
    return compareDate(date, new Date()) <= 0 || impossible.has(date.toISOString().slice(0, 10));
  };
  
  const calendarOnChange = useCallback(({ $d }) => {
    setPickDate(new Date($d));
  }, []);

  return (
    <Paper
      style={{
        width: 320,
        margin: "20px auto",
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          shouldDisableDate={shouldDisableDate}
          onChange={calendarOnChange}
          onMonthChange={onMonthChange}
        />
      </LocalizationProvider>
    </Paper>
  );
};

export default React.memo(ReservationDatePicker);
