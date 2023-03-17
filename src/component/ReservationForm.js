import React from "react";
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

const style = { margin: "20px 0px" };

const ReservationForm = ({ reservationModel, reservationController, reservationFormData, setReservationFormData }) => {
  return (
    <>
      <Modal
        open={reservationModel.reservationFormModal}
        onClose={() => reservationController.setReservationFormModal(false)}
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
                <Input id="patient_name" onChange={e => setReservationFormData({...reservationFormData, patient_name: e.currentTarget.value })}/>
              </FormControl>
            </Grid>

            <Grid item xs={12} style={style}>
                <Grid container spacing={2}>
                  <Grid item xs={3} style={{ alignSelf: "flex-end" }}>
                  <FormControl>
                    <InputLabel id="phone-label1">연락처</InputLabel>
                    <Input id="phone1" />
                  </FormControl>
                  </Grid>
                  <Grid item xs={1} style={{ alignSelf: "flex-end" }}>
                    -
                  </Grid>
                  <Grid item xs={3} style={{ alignSelf: "flex-end" }}>
                  <FormControl>
                    <Input id="phone2" />
                    </FormControl>
                  </Grid>
                  <Grid item xs={1} style={{ alignSelf: "flex-end" }}>
                    -
                  </Grid>
                  <Grid item xs={3} style={{ alignSelf: "flex-end" }}>
                    <FormControl>
                    <Input id="phone3" />
                    </FormControl>

                  </Grid>
                </Grid>
            </Grid>

            <Grid item xs={6} style={style}>
              <FormControl>
                <InputLabel id="date-time">예약날짜/시간</InputLabel>
                <Input readOnly onClick={() => reservationController.setDateTimePickerModal(true)} value={reservationFormData.date_time} />
              </FormControl>
            </Grid>

            <Grid item xs={3} style={style}>
              <FormControl>
                <InputLabel id="state">상태</InputLabel>
                <Select labelId="state" label="state" defaultValue="예약중">
                  <MenuItem value="예약중">예약중</MenuItem>
                  <MenuItem value="완료">완료</MenuItem>
                  <MenuItem value="취소">취소</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={3} style={style}>
              <FormControl>
                  <InputLabel id="doctor_label">담당의</InputLabel>
                  <Select
                    id="doctor-select"
                    labelId="doctor_label"
                    label="doctor"
                    defaultValue="doctor1"
                  >
                    <MenuItem value="doctor1">김더존</MenuItem>
                    <MenuItem value="doctor2">최을지</MenuItem>
                  </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} style={style}>
              <FormControl>
                <TextareaAutosize
                  placeholder="예약메모"
                  minRows={5}
                  style={{ width: 400 }}
                />
              </FormControl>
            </Grid>

            <Grid item xs={8}></Grid>
            <Grid item xs={4} style={style}>
              <Button>등록</Button>
              <Button onClick={() => reservationController.setReservationFormModal(false)}>취소</Button>
            </Grid>
          </Grid>
        </Paper>
      </Modal>
    </>
  );
};

export default React.memo(ReservationForm);
