import { useState } from "react";
import { Grid } from "@mui/material";
import ReservationMonth from "../component/ReservationCalendar";
import ReservationDay from "../component/ReservationDay";
import ReservationModel from "../model/ReservationModel";

const ReservationLayout = () => {
  const [reservationModel, reservationController] = ReservationModel();

  return (
    <Grid container spacing={2} sx={{ maxHeight: 700 }}>
      <Grid item xs={8}>
        <ReservationMonth reservationModel={reservationModel} reservationController={reservationController}/>
      </Grid>
      <Grid item xs={3}>
        <ReservationDay reservationModel={reservationModel} reservationController={reservationController}/>
      </Grid>
    </Grid>
  );
};

export default ReservationLayout;
