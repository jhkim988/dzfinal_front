import React, { useState  } from "react";
import { Grid } from "@mui/material";
import ReservationCalendar from "../component/ReservationCalendar";
import ReservationDay from "../component/ReservationDay";
import useViewDate from '../hoc/useViewDate';

export const doctorData = [
  { text: "김더존", id: '1', color: "F29D94" },
  { text: "이을지", id: '2', color: "BEDEF3" },
];

export const resources = [
  { fieldName: "doctor", title: "doctor", instances: doctorData },
];

const ReservationLayout = () => {
  const { viewDate, setViewDate, setViewCalendar } = useViewDate();
  const [daySchedule, setDaySchedule] = useState([]);
  const [calendarAppointments, setCalendarAppointments] = useState([]);
  return (
    <>
      <Grid container spacing={2} sx={{ maxHeight: 700 }}>
        <Grid item xs={8}>
          <ReservationCalendar
            viewDate={viewDate}
            setViewDate={setViewDate}
            calendarAppointments={calendarAppointments}
            setViewCalendar={setViewCalendar}
          />
        </Grid>
        <Grid item xs={3}>
          <ReservationDay
            viewDate={viewDate}
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
