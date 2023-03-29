import React, { useCallback, useState, useEffect, useRef } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Paper } from "@mui/material";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import dayjs from 'dayjs';
import axios from "axios";

import ReservationTimePicker from "./ReservationTimePicker"; 
import { compareDate, offsetDate, offsetDateObj } from './utils/dateUtils';

const ReservationDatePicker = ({
  pickDate,
  pickTime,
  setReservationFormData,
  doctor,
}) => {
  const requestAbortController = useRef(null);
  const [impossible, setImpossible] = useState(new Set());
  const [viewPickerDate, setViewPickerDate] = useState(pickDate ? offsetDateObj(pickDate) : new Date());
  useEffect(() => { setViewPickerDate(pickDate ? offsetDateObj(pickDate) : new Date()) }, [pickDate]);

  const getImpossible = useCallback((doctor, year, month) => {
    const controller = new AbortController();
    axios.get("/api/reservation/impossible/day", {
      params: { doctor, year, month }
    }).then(({ data }) => {
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
          onChange={({ $d }) => {
            const date = new Date($d);
            const offsetDateStr = offsetDate(date);
            setViewPickerDate(date)
            setReservationFormData((prev) => ({...prev, wish_date: offsetDateStr, date_time: `${offsetDateStr} ${prev.wish_time}`}))
          }}
      />
      </LocalizationProvider>
      
      <ReservationTimePicker
        pickTime={pickTime}
        setReservationFormData={setReservationFormData}
        viewPickerDate={viewPickerDate}
        doctor={doctor}
      />

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
