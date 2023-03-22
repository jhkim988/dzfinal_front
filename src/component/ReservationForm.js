import React, { useCallback, useEffect } from "react";
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
} from "@mui/material";
import axios from "axios";

const style = { margin: "20px 0px" };

const ReservationForm = ({
  reservationFormModal,
  setReservationFormModal,
  reservationFormData,
  setReservationFormData,
  setDateTimePickerModal,
  pickDate,
  loadCalendar,
  loadDayAppointments,
}) => {
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
    console.log('ReservationForm Update: ', pickDate)
  }, [pickDate])
  return (
    <>
      <Modal
        open={reservationFormModal.modalState}
        onClose={() =>
          setReservationFormModal({
            ...reservationFormModal,
            modalState: false,
          })
        }
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
                />
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
    </>
  );
};

export default React.memo(ReservationForm);
