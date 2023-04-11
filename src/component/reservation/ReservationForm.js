import React, { useCallback, useEffect, useState, useRef } from "react";
import {
  Button,
  Paper,
  Grid,
  Modal,
  FormControl,
  InputLabel,
  Input,
  Select,
  MenuItem,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { offsetDate } from "./utils/dateUtils";
import ReservationDateTimePickerModal from "./ReservationDateTimePickerModal";
import PatientAutoComplete from './../reception/PatientAutoComplete';
import axiosClient from './../login/AxiosClient';


const style = { margin: "20px 0px" };

const ReservationForm = ({
  reservationFormModal,
  setReservationFormModal,
  pickDate,
  pickTime,
  requestSuccessCallback,
}) => {
  const [dateTimePickerModal, setDateTimePickerModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const anchorRef = useRef(null);
  const [reservationFormData, setReservationFormData] = useState({
    patient_id: 0,
    patient_name: '',
    phone_number1: '',
    phone_number2: '',
    phone_number3: '',
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
    axiosClient.post("/api/reservation", reservationFormData, {
      headers: { 'Content-Type': 'application/json;charset=utf-8' }
    }).then((res) => {
      if (res.status === 200) {
        setReservationFormModal(prev => ({ ...prev, modalState: false }));
        requestSuccessCallback(reservationFormData, res.data);
      }
    });
  }, [reservationFormData]);

  const putReservation = useCallback((e) => {
    axiosClient.put("/api/reservation", reservationFormData).then((res) => {
      if (res.status === 200) {
        setReservationFormModal(prev => ({ ...prev, modalState: false }));
        requestSuccessCallback(reservationFormData, res.data);
      }
    });
  }, [reservationFormData]);

  useEffect(() => {
    if (reservationFormModal.mode === "POST") {
      const date = pickDate ? pickDate.toISOString().slice(0, 10) : null;
      setReservationFormData({
        patient_id: 0,
        patient_name: '',
        phone_number1: '',
        phone_number2: '',
        phone_number3: '',
        date_time: `${date} ${pickTime}`,
        wish_date: date,
        wish_time: pickTime,
        state: "예약중",
        treatment_reason: '',
        doctor: reservationFormModal.doctor,
      });
    } else if (reservationFormModal.mode === "PUT") {
      axiosClient.get(`/api/reservation/${reservationFormModal.reservation_id}`)
        .then(({ data }) => {
          const data_date = new Date(data.wish_date);
          const wish_date = offsetDate(data_date);
          setReservationFormData({
            reservation_id: data.reservation_id,
            patient_id: data.patient_id,
            patient_name: data.patient_name,
            phone_number1: data.phone_number1,
            phone_number2: data.phone_number2,
            phone_number3: data.phone_number3,
            date_time: `${wish_date} ${data.wish_time}`,
            wish_date: wish_date,
            wish_time: data.wish_time,
            state: data.state,
            doctor: data.doctor,
            treatment_reason: data.treatment_reason,
          });
        });
    }
  }, [reservationFormModal.modalState, pickDate, pickTime]);

  return (
    <>
      <Modal
        open={reservationFormModal.modalState}
        onClose={() => {
          setDateTimePickerModal(false);
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
            width: 450,
            height: 645,
            left: "50%",
            top: "50%",
            position: "absolute",
            transform: "translate(-50%, -50%)",
          }}
          ref={anchorRef}
        >
          <Grid container>
            <Grid item xs={6} style={style}>
              <PatientAutoComplete
                patient_name={reservationFormData.patient_name}
                onSelect={(e, value) => {
                  setReservationFormData((prev) => ({ ...prev
                  , patient_id: value.patient_id
                  , patient_name: value.patient_name
                  , phone_number1: value.phone_number1
                  , phone_number2: value.phone_number2
                  , phone_number3: value.phone_number3 }))
                }}
                onInputChange={(e, value, reason) => {
                  if (reason === "input") {
                    setReservationFormData(prev => ({ ...prev, patient_name: value, patient_id: 0, phone_number1: "", phone_number2: "", phone_number3: "" }));
                  } else if (reason === "clear") {
                    setReservationFormData(prev => ({ ...prev, patient_name: "", patient_id: 0, phone_number1: "", phone_number2: "", phone_number3: "" }));
                  }
                }}
                variant="standard"
              />
            </Grid>
            <Grid item xs={6}/>
            <Grid item xs={12} style={style}>
              <Grid container spacing={2}>
                <Grid item xs={3} style={{ alignSelf: "flex-end" }}>
                  <FormControl>
                    <InputLabel id="phone-label1">연락처</InputLabel>
                    <Input
                      id="phone_number1"
                      name="phone_number1"
                      onChange={formOnChange}
                      value={reservationFormData.phone_number1 || ""}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={1} style={{ alignSelf: "flex-end" }}>
                  ─
                </Grid>
                <Grid item xs={3} style={{ alignSelf: "flex-end" }}>
                  <FormControl>
                    <Input
                      id="phone_number2"
                      name="phone_number2"
                      onChange={formOnChange}
                      value={reservationFormData.phone_number2 || ""}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={1} style={{ alignSelf: "flex-end" }}>
                  ─
                </Grid>
                <Grid item xs={3} style={{ alignSelf: "flex-end" }}>
                  <FormControl>
                    <Input
                      id="phone_number3"
                      name="phone_number3"
                      onChange={formOnChange}
                      value={reservationFormData.phone_number3 || ""}
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
                  name="doctor"
                  onChange={formOnChange}
                  value={reservationFormData.doctor || 1}
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
                  name="state"
                  onChange={formOnChange}
                  value={reservationFormData.state || "예약중"}
                >
                  <MenuItem value="예약중">예약중</MenuItem>
                  <MenuItem value="완료">완료</MenuItem>
                  <MenuItem value="취소">취소</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} />
            <Grid item xs={6} style={style}>
              <FormControl>
                <InputLabel id="date-time">예약날짜/시간</InputLabel>
                <Input
                  readOnly
                  onClick={(e) => {
                    console.log("click", anchorRef.current, dateTimePickerModal);
                    setAnchorEl(anchorRef.current);
                    setDateTimePickerModal(prev => !prev);
                  }
                  }
                  value={reservationFormData.wish_date && reservationFormData.wish_time ? reservationFormData.date_time : ''}
                  name="date-time"
                  onChange={formOnChange}
                  endAdornment={<InputAdornment position="end">
                    <CalendarMonthIcon />
                  </InputAdornment>}
                >
                </Input>

              </FormControl>
            </Grid>

            <Grid item xs={12} style={style}>
              <FormControl>
                <InputLabel sx={{ background: "white" }}>예약메모</InputLabel>
                <OutlinedInput
                  minRows={5}
                  multiline
                  style={{ width: 410 }}
                  name="treatment_reason"
                  onChange={formOnChange}
                  value={reservationFormData.treatment_reason || ""}
                />
              </FormControl>
            </Grid>

            <Grid item xs={8}></Grid>
            <Grid item xs={2} style={style}>
              {reservationFormModal.mode === "POST" ? (
                <Button onClick={postReservation}>등록</Button>
              ) : (
                <Button onClick={putReservation}>수정</Button>
              )}
            </Grid>
            <Grid item xs={2} style={style}>
              <Button
                onClick={(e) => {
                  setDateTimePickerModal(false);
                  setReservationFormModal({
                    ...reservationFormModal,
                    modalState: false,
                  });
                }}
              >
                닫기
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Modal>
      <ReservationDateTimePickerModal
        dateTimePickerModal={dateTimePickerModal}
        setDateTimePickerModal={setDateTimePickerModal}
        reservationFormData={reservationFormData}
        setReservationFormData={setReservationFormData}
        pickDate={pickDate}
        pickTime={pickTime}
        anchorEl={anchorEl}
      />
    </>
  );
};

export default ReservationForm;
