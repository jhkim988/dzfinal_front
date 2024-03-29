import React, { useCallback } from "react";
import { Modal, Button, Popper, Paper } from "@mui/material";
import ReservationDatePicker from "./ReservationDatePicker";

const ReservationDateTimePickerModal = ({
  dateTimePickerModal,
  setDateTimePickerModal,
  reservationFormData,
  setReservationFormData,
  pickDate,
  pickTime,
  anchorEl
}) => {
  const selectEvent = useCallback(() => {
    const date_time = `${reservationFormData.wish_date} ${reservationFormData.wish_time}`;
    reservationFormData.wish_date && reservationFormData.wish_time
      ? setReservationFormData({ ...reservationFormData, date_time })
      : setReservationFormData({ ...reservationFormData, date_time: '' });
    setDateTimePickerModal(false);
  }, [setReservationFormData, setDateTimePickerModal, reservationFormData]);
  return (
    <>
      <Popper open={dateTimePickerModal} onClose={() => setDateTimePickerModal(false)} placement="right-end" anchorEl={anchorEl} sx={{ zIndex: 2000 }}>
        <Paper sx={{ marginLeft: 2}}>
          <ReservationDatePicker
            pickDate={pickDate}
            pickTime={pickTime}
            setReservationFormData={setReservationFormData}
            doctor={reservationFormData.doctor}
          />
          <Button
            style={{ display: "block", width: "100%" }}
            variant="contained"
            onClick={selectEvent}
          >
            선택
          </Button>
        </Paper>
      </Popper>
    </>
    // <Modal open={dateTimePickerModal} onClose={() => setDateTimePickerModal(false)}>
    //   <>
    //     <ReservationDatePicker
    //       pickDate={pickDate}
    //       pickTime={pickTime}
    //       setReservationFormData={setReservationFormData}
    //       doctor={reservationFormData.doctor}
    //     />
    //     <Button
    //       style={{ display: "block", margin: "20px auto", width: "320px" }}
    //       variant="contained"
    //       onClick={selectEvent}
    //     >
    //       선택
    //     </Button>
    //   </>
    // </Modal>
  );
};

export default ReservationDateTimePickerModal;
