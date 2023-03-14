import { useState } from "react";
import { Grid } from "@mui/material";
import ReservationMonth from "../component/ReservationMonth";
import ReservationDay from "../component/ReservationDay";

const ReservationLayout = () => {
  const [viewDate, setViewDate] = useState(new Date());
  const [daySchedule, setDaySchedule] = useState([]);
  return (
    <Grid container spacing={2} sx={{ maxHeight: 700 }}>
      <Grid item xs={8}>
        <ReservationMonth viewDate={viewDate} setViewDate={setViewDate} setDaySchedule={setDaySchedule}/>
      </Grid>
      <Grid item xs={3}>
        <ReservationDay viewDate={viewDate} daySchedule={daySchedule}/>
      </Grid>
    </Grid>
  );
};

export default ReservationLayout;
