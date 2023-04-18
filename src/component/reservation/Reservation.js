import React, { useState  } from "react";
import { Grid } from "@mui/material";
import ReservationCalendar from "./ReservationCalendar";
import ReservationDay from "./ReservationDay";
import useViewDate from './useViewDate';

const ReservationLayout = () => {
  const { viewDate, setViewDate, setViewCalendar } = useViewDate();
  const [daySchedule, setDaySchedule] = useState([]);
  const [calendarAppointments, setCalendarAppointments] = useState([]);
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <ReservationCalendar
            viewDate={viewDate}
            setViewDate={setViewDate}
            calendarAppointments={calendarAppointments}
            setViewCalendar={setViewCalendar}
          />
        </Grid>
        <Grid item xs={4}>
          <ReservationDay
            viewDate={viewDate}
            setViewDate={setViewDate}
            daySchedule={daySchedule}
            setDaySchedule={setDaySchedule}
            setCalendarAppointments={setCalendarAppointments}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default React.memo(ReservationLayout);
