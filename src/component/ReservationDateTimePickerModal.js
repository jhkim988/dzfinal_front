import React, { useCallback } from "react";
import { Modal, Button } from "@mui/material";
import ReservationDatePicker from "./ReservationDatePicker";
import ReservationTimePicker from "./ReservationTimePicker";

const ReservationDateTimePickerModal = ({
  setDateTimePickerModal,
  dateTimePickerModal,
  reservationFormData,
  setReservationFormData,
  pickDate,
  setPickDate,
}) => {
  const selectEvent = useCallback(() => {
    const date_time = `${reservationFormData.wish_date} ${reservationFormData.wish_time}`;
    reservationFormData.wish_date && reservationFormData.wish_time
    ? setReservationFormData({ ...reservationFormData, date_time })
    : setReservationFormData({ ...reservationFormData, date_time: ''});
    setDateTimePickerModal(false);
  }, [setReservationFormData, setDateTimePickerModal, reservationFormData]);
  return (
    <Modal open={dateTimePickerModal} onClose={() => setDateTimePickerModal(false)}>
      <>
        <ReservationDatePicker
          pickDate={pickDate}
          setPickDate={setPickDate}
          doctor={reservationFormData.doctor}
        />
        <ReservationTimePicker
          reservationFormData={reservationFormData}
          setReservationFormData={setReservationFormData}
          pickDate={pickDate}
          doctor={reservationFormData.doctor}
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
