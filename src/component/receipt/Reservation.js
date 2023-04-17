import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import ReservationForm from "../reservation/ReservationForm"
const Reservation = ({ init }) => {
  const [reservationFormModal, setReservationFormModal] = useState({
    modalState: false,
    mode: "POST", // POST or PUT
    doctor: 1,
  });

  useEffect(() => {
    setReservationFormModal(prev => ({ ...prev, mode: "POST" }));
  }, [init])

  const requestSuccessCallback = ({ state }, data) => {
    if (reservationFormModal.mode === "POST") {
      setReservationFormModal(prev => ({...prev, mode: "PUT", reservation_id: data }));
    } else if (reservationFormModal.mode === "PUT") {
      if (state === "취소") {
        setReservationFormModal(prev => ({...prev, mode: "POST"}));
      }
    }
  }
  const onClick = () => {
    setReservationFormModal(prev => ({ ...prev, modalState: true }));
  }

  return (
    <>
      {reservationFormModal.mode === "POST" ? (
        <Button variant="contained" color="primary" onClick={onClick} disabled={!init.patient_id}>
          다음 진료 예약
        </Button>
      ) : (
        <Button variant="contained" color="warning" onClick={onClick} disabled={!init.patient_id}>
          예약수정
        </Button>
      )}
      <ReservationForm
        reservationFormModal={reservationFormModal}
        setReservationFormModal={setReservationFormModal}
        requestSuccessCallback={requestSuccessCallback}
        init={init}
      />
    </>
  );
};

export default Reservation;
