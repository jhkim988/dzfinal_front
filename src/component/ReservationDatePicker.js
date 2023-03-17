import dayjs from "dayjs";
import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Paper } from "@mui/material";

const impossible = {};

const ReservationDatePicker = ({
  reservationFormData,
  setReservationFormData,
}) => {
  const calendarOnChange = ({ $d }) => {
    const date = $d.toISOString().slice(0, 10);
    const time = `${$d.getHours().toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })}:${$d.getMinutes().toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })}`;
    setReservationFormData({
      ...reservationFormData,
      date,
      date_time: `${date} ${time}`,
    });
  };
  return (
    <Paper
      style={{
        width: 320,
        margin: "20px auto",
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          shouldDisableDate={({ $d }) =>
            impossible[$d.toISOString().slice(0, 10)] !== undefined
          }
          onChange={calendarOnChange}
          defaultValue={dayjs(reservationFormData.date_time)}
        />
      </LocalizationProvider>
    </Paper>
  );
};

export default ReservationDatePicker;
