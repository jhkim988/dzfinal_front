import React, { useCallback, useState, useEffect, useRef } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Paper } from "@mui/material";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import axios from "axios";

import { compareDate, offsetDateObj } from './utils/dateUtils';
import dayjs from 'dayjs';

const ReservationDatePicker = ({
  reservationFormData,
  setReservationFormData,
  doctor,
}) => {
  const requestAbortController = useRef(null);
  const [impossible, setImpossible] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [viewPickerDate, setViewPickerDate] = useState(offsetDateObj(reservationFormData.date_time));
  
  useEffect(() => { setViewPickerDate(offsetDateObj(reservationFormData.date_time)) }, [reservationFormData.date_time]);

  const getImpossible = useCallback((doctor, year, month) => {
    const controller = new AbortController();
    setIsLoading(true);
    axios.get("/api/reservation/impossible/day", {
      params: { doctor, year, month }
    }).then(({ data }) => {
      setIsLoading(false);
      setImpossible(new Set(data));
    })
    requestAbortController.current = controller;
  }, []);
  
  const onMonthChange = useCallback(({ $y, $M }) => {
    setViewPickerDate(null);
    if (requestAbortController.current) {
      requestAbortController.current.abort();
    }
    getImpossible(doctor, $y, $M+1);
  }, []);
  
  useEffect(() => {
    getImpossible(doctor, viewPickerDate.getYear()+1900, viewPickerDate.getMonth()+1);
    return () => requestAbortController.current?.abort();
  }, [doctor, getImpossible]);

  return (
    <Paper
      style={{
        width: 320,
        margin: "20px auto",
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          onMonthChange={onMonthChange}
          slots={{
            day: ServerDay
          }}
          slotProps={{
            day: {
              impossible
            }
          }}
          value={viewPickerDate && dayjs(viewPickerDate)}
      />
      </LocalizationProvider>
    </Paper>
  );
};

const ServerDay = ({impossible = new Set(), day, outsideCurrentMonth, ...others}) => {
  const dateStr = day.format('YYYY-MM-DD');
  const date = offsetDateObj(dateStr);
  const disabled = compareDate(date, new Date()) <= 0 || impossible.has(dateStr);
  return <PickersDay
    {...others}
    disabled={disabled}
    outsideCurrentMonth={outsideCurrentMonth}
    day={day}
  />
}

export default React.memo(ReservationDatePicker);