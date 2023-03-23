import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Paper,
  Grid,
  Modal,
  TextareaAutosize,
  FormControl,
  InputLabel,
  Input,
  Select,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import axios from "axios";
import { offsetDate } from "../utils/dateUtils";
import ReservationDateTimePickerModal from "./ReservationDateTimePickerModal";

const style = { margin: "20px 0px" };

const ReservationForm = ({
  reservationFormModal,
  setReservationFormModal,
  pickDate,
  setPickDate,
  pickTime,
  setPickTime,
  loadCalendar,
  loadDayAppointments,
}) => {
  const [dateTimePickerModal, setDateTimePickerModal] = useState(false);
  const [reservationFormData, setReservationFormData] = useState({
    patient_id: 0,
    patient_name: '',
    phone1: '',
    phone2: '',
    phone3: '',
    date_time: '',
    wish_date: '',
    wish_time: '',
    state: "예약중",
    doctor: 0,
    treatment_reason: '',
  });
  
  const formOnChange = useCallback((e) => {
    setReservationFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, [setReservationFormData]);

  const postReservation = useCallback((e) => {
    axios.post("/api/reservation", reservationFormData, {
      headers: { 'Content-Type': 'application/json;charset=utf-8'}
    }).then((res) => {
      if (res.status === 200) {
        setReservationFormModal(prev => ({ ...prev, modalState: false }));
        loadCalendar();
        loadDayAppointments(reservationFormData.wish_date);
      }
    });
  }, [reservationFormData]);
  const putReservation = useCallback((e) => {
    axios.put("/api/reservation", reservationFormData).then((res) => {
      if (res.status === 200) {
        setReservationFormModal(prev => ({ ...prev, modalState: false }));
        loadCalendar();
        loadDayAppointments(reservationFormData.wish_date);  
      }
    });
  }, [reservationFormData]);

  useEffect(() => {
    if (reservationFormModal.mode === "POST") {
      const date = pickDate.toISOString().slice(0, 10);
      setReservationFormData({
        patient_id: 0,
        patient_name: '',
        phone1: '',
        phone2: '',
        phone3: '',
        date_time: `${date} ${pickTime}`,
        wish_date: date,
        wish_time: pickTime,
        state: "예약중",
        treatment_reason: '',
        doctor: reservationFormModal.doctor,
      });
  
    } else if (reservationFormModal.mode === "PUT") {
      axios.get(`/api/reservation/${reservationFormModal.reservation_id}`)
        .then(({data}) => {
          const data_date = new Date(data.wish_date);
          const wish_date = offsetDate(data_date);
          setReservationFormData({
            reservation_id: data.reservation_id,
            patient_id: data.patient_id,
            patient_name: data.patient_name,
            phone1: data.phone1,
            phone2: data.phone2,
            phone3: data.phone3,
            date_time: `${wish_date} ${data.wish_time}`,
            wish_date: wish_date,
            wish_time: data.wish_time,
            state: data.state,
            doctor: data.doctor,
            treatment_reason: data.treatment_reason,
          });
      });
    }
  }, [reservationFormModal.modalState])
  return (
    <>
      <Modal
        open={reservationFormModal.modalState}
        onClose={() => {
          setReservationFormModal({
            ...reservationFormModal,
            modalState: false,
          })
          setReservationFormData({});
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper
          sx={{
            padding: "20px",
            width: 400,
            left: "50%",
            top: "50%",
            position: "absolute",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Grid container>
            <Grid item xs={12} style={style}>
              <FormControl>
                <InputLabel htmlFor="patient_name">예약자 성함</InputLabel>
                <Input
                  id="patient_name"
                  name="patient_name"
                  onChange={formOnChange}
                  value={reservationFormData.patient_name}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} style={style}>
              <Grid container spacing={2}>
                <Grid item xs={3} style={{ alignSelf: "flex-end" }}>
                  <FormControl>
                    <InputLabel id="phone-label1">연락처</InputLabel>
                    <Input
                      id="phone1"
                      name="phone1"
                      onChange={formOnChange}
                      value={reservationFormData.phone1}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={1} style={{ alignSelf: "flex-end" }}>
                  -
                </Grid>
                <Grid item xs={3} style={{ alignSelf: "flex-end" }}>
                  <FormControl>
                    <Input
                      id="phone2"
                      name="phone2"
                      onChange={formOnChange}
                      value={reservationFormData.phone2}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={1} style={{ alignSelf: "flex-end" }}>
                  -
                </Grid>
                <Grid item xs={3} style={{ alignSelf: "flex-end" }}>
                  <FormControl>
                    <Input
                      id="phone3"
                      name="phone3"
                      onChange={formOnChange}
                      value={reservationFormData.phone3}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={3} style={style}>
              <FormControl>
                <InputLabel id="doctor_label">담당의</InputLabel>
                <Select
                  id="doctor-select"
                  labelId="doctor_label"
                  label="doctor"
                  defaultValue={1}
                  name="doctor"
                  onChange={formOnChange}
                  value={reservationFormData.doctor}
                >
                  <MenuItem value="1">김더존</MenuItem>
                  <MenuItem value="2">이을지</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={3} style={style}>
              <FormControl>
                <InputLabel id="state">상태</InputLabel>
                <Select
                  labelId="state"
                  label="state"
                  defaultValue="예약중"
                  name="state"
                  onChange={formOnChange}
                  value={reservationFormData.state}
                >
                  <MenuItem value="예약중">예약중</MenuItem>
                  <MenuItem value="완료">완료</MenuItem>
                  <MenuItem value="취소">취소</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6} style={style}>
              <FormControl>
                <InputLabel id="date-time">예약날짜/시간</InputLabel>
                <Input
                  readOnly
                  onClick={() =>
                    setDateTimePickerModal(true)
                  }
                  value={reservationFormData.date_time}
                  name="date-time"
                  onChange={formOnChange}
                  endAdornment={<InputAdornment position="end">
                  <CalendarMonthIcon/>
                </InputAdornment>}
                >
                </Input>

              </FormControl>
            </Grid>

            <Grid item xs={12} style={style}>
              <FormControl>
                <TextareaAutosize
                  placeholder="예약메모"
                  minRows={5}
                  style={{ width: 400 }}
                  name="treatment_reason"
                  onChange={formOnChange}
                  value={reservationFormData.treatment_reason}
                />
              </FormControl>
            </Grid>

            <Grid item xs={8}></Grid>
            <Grid item xs={4} style={style}>
              {reservationFormModal.mode === "POST" ? (
                <Button onClick={postReservation}>등록</Button>
              ) : (
                <Button onClick={putReservation}>수정</Button>
              )}
              <Button
                onClick={(e) => {
                  setReservationFormModal({
                    ...reservationFormModal,
                    modalState: false,
                  });
                }}
              >
                취소
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Modal>
      <ReservationDateTimePickerModal
        setDateTimePickerModal={setDateTimePickerModal}
        dateTimePickerModal={dateTimePickerModal}
        reservationFormData={reservationFormData}
        setReservationFormData={setReservationFormData}
        pickDate={pickDate}
        setPickDate={setPickDate}
        pickTime={pickTime}
        setPickTime={setPickTime}
      />
    </>
  );
};

export default ReservationForm;
