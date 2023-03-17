import { useState } from "react";
import { Grid } from "@mui/material";
import ReservationMonth from "../component/ReservationCalendar";
import ReservationDay from "../component/ReservationDay";
import ReservationModel from "../model/ReservationModel";
import ReservationDateTimePickerModal from "../component/ReservationDateTimePickerModal";
import ReservationForm from "./../component/ReservationForm";

const ReservationLayout = () => {
  const [reservationModel, reservationController] = ReservationModel();
  // const [dateTimePickerModal, setDateTimePickerModal] = useState(false);
  // const [reservationFormModal, setReservationFormModal] = useState(false);
  const [reservationFormData, setReservationFormData] = useState({
    patient_name: null,
    phone1: null,
    phone2: null,
    phone3: null,
    date_time: null,
    date: null,
    time: null,
    state: "예약중",
    doctor: "doctor1",
    memo: null,
  });
  return (
    <>
      <Grid container spacing={2} sx={{ maxHeight: 700 }}>
        <Grid item xs={8}>
          <ReservationMonth
            reservationModel={reservationModel}
            reservationController={reservationController}
          />
        </Grid>
        <Grid item xs={3}>
          <ReservationDay
            reservationModel={reservationModel}
            reservationController={reservationController}
            setReservationFormData={setReservationFormData}
          />
        </Grid>
      </Grid>
      <ReservationForm
        reservationModel={reservationModel}
        reservationController={reservationController}
        reservationFormData={reservationFormData}
        setReservationFormData={setReservationFormData}
      />
      <ReservationDateTimePickerModal
        reservationModel={reservationModel}
        reservationController={reservationController}
        reservationFormData={reservationFormData}
        setReservationFormData={setReservationFormData}
      />
    </>
  );
};

export default ReservationLayout;
