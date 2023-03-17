import { useState } from "react";
import { Modal, Button, Paper } from "@mui/material";
import ReservationDatePicker from "./ReservationDatePicker";
import ReservationTimePicker from "./ReservationTimePicker";

const ReservationDateTimePickerModal = ({
  reservationModel,
  reservationController,
  reservationFormData,
  setReservationFormData,
}) => {
  const selectEvent = () => {
    const date_time = `${reservationFormData.date} ${reservationFormData.time}`;
    reservationFormData.date && reservationFormData.time
    ? setReservationFormData({ ...reservationFormData, date_time })
    : setReservationFormData({ ...reservationFormData, date_time: null});
    reservationController.setDateTimePickerModal(false);
  };
  return (
    <Modal open={reservationModel.dateTimePickerModal} onClose={() => reservationController.setDateTimePickerModal(false)}>
      <>
        <ReservationDatePicker
          reservationFormData={reservationFormData}
          setReservationFormData={setReservationFormData}
        />
        <ReservationTimePicker
          reservationFormData={reservationFormData}
          setReservationFormData={setReservationFormData}
        />
        <Button
          style={{ display: "block", margin: "20px auto", width: "320px" }}
          variant="contained"
          onClick={selectEvent}
        >
          선택
        </Button>
      </>
    </Modal>
  );
};

export default ReservationDateTimePickerModal;
