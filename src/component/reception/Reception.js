import { Grid, Paper } from "@mui/material";
import { useState } from "react";
import DailyReservationList from "./DailyReservationList";
import PatientForm from "./PatientForm";
import ReceptionForm from "./ReceptionForm";
import Receipt from "../receipt/Receipt";
import WaitingQueueLayout from "./../waiting/WaitingQueueLayout";
import ReceiptList from "../receipt/ReceiptList";
import axiosClient from './../login/AxiosClient';

const Reservation_API_BASE_URL = "/api/reservation";

const Reception = () => {
  const [patient_id, setPatient_id] = useState(null);
  const [selectedReservationDetails, setSelectedReservationDetails] = useState(
    {}
  );
  const [selectedAddress, setSelectedAddress] = useState({
    zip_code: "",
    address: "",
  });
  const [patientData, setPatientData] = useState({
    patient_name: "",
    front_registration_number: "",
    back_registration_number: "",
    gender: "",
    phone_number1: "",
    phone_number2: "",
    phone_number3: "",
    insurance: "",
    zip_code: "",
    address: "",
    detail_address: "",
    insurance: "true",
  });
  const [receptionData, setReceptionData] = useState({
    doctor: "",
    treatment_reason: "",
    systolic: "",
    diastolic: "",
    blood_sugar: "",
    height: "",
    weight: "",
    bmi: "",
  });

  // (Receipt)수납
  const [receiptData, setReceiptData] = useState({
    reception: {},
    patient: {},
    clinic: {},
    receipt: {},
  });

  // DailyReservation
  const [reservation, setReservation] = useState([]);

  const clickRowCallback = async ({ reception_id, patient_id }) => {
    setPatient_id(patient_id);
    try {
      axiosClient.get(`/api/reception/detail/${reception_id}`).then(({ data }) => {
        setPatientData(data.patient)
        setReceptionData(data.reception);
        setReceiptData(data);
        console.log(data);
      });
    } catch (error) {
      console.log(error);
    }
  }

  // 수납내역목록 검색
  // 페이징
  const receiptRecordSearch = (
    { start, end, type, searchText, currentPage },
    callback
  ) => {
    console.log(start?.format("YYYY-MM-DD"));
    console.log(end?.format("YYYY-MM-DD"));
    axiosClient
      .get(
        "/api/receipt/getReceiptList",
        {
          params: {
            type,
            searchText,
            start_date: start?.format("YYYY-MM-DD"),
            end_date: end?.format("YYYY-MM-DD"),
            currentPage: `${currentPage}`,
          },
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        callback(response.data || []);
      });
  };

  const [selectedOneReceipt, setSelectedOneReceipt] = useState({
    receipt_id: 0,      // 데이터 선택 후 수정을 하기 위해 추가
    reception_id: 0,
    patient_name: "",
    insurance: 0,
    treatment: 0,
    doctor: 0,
    gender: 0,
    front_registration_number: "",
    back_registration_number: "",
    address: "",
    detail_address: "",
    clinic_request: 0,
    has_prescription: 0,
    currentPage: 1,     // 페이징처리를 위해 추가
  });

  const loadDailyReservationList = () => {
    axiosClient.get(Reservation_API_BASE_URL)
      .then((response) => {
        setReservation(response.data || []);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <WaitingQueueLayout
            initPanel="3"
            nextState="수납중"
            clickRowCallback={clickRowCallback}
            shouldAutoCall={({ data: { state } }) => state === "수납완료"}
            findNextAutoCall={({ state }) => state === "수납대기"}
            shouldDisableCallButton={({ state }) => state !== "수납대기"}
          />
        </Grid>

        <Grid item xs={7.5}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper elevation={3}>
                <ReceiptList
                  clickRowCallback={clickRowCallback}
                  receiptRecordSearch={receiptRecordSearch}
                  patient_id={patient_id}
                  setSelectedOneReceipt={setSelectedOneReceipt}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} >
              <Paper elevation={3} sx={{ height: "42vh", display: "flex", justifyContent: "space-between" }}>
                <Grid container spacing={2}>
                  <Grid item xs={5}>
                    <DailyReservationList
                      setPatientData={setPatientData}
                      setReceptionData={setReceptionData}
                      setSelectedReservationDetails={setSelectedReservationDetails}
                      loadDailyReservationList={loadDailyReservationList}
                      reservation={reservation}
                      setReservation={setReservation}
                    />
                  </Grid>
                  <Grid item xs={7}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <PatientForm
                          setPatient_id={setPatient_id}
                          setReceptionData={setReceptionData}
                          selectedReservationDetails={selectedReservationDetails}
                          patientData={patientData}
                          setPatientData={setPatientData}
                          selectedAddress={selectedAddress}
                          setSelectedAddress={setSelectedAddress}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <ReceptionForm
                          patient_id={patient_id}
                          receptionData={receptionData}
                          setReceptionData={setReceptionData}
                          patientData={patientData}
                          setPatientData={setPatientData}
                          setSelectedAddress={setSelectedAddress}
                          loadDailyReservationList={loadDailyReservationList}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={2.5}>
          <Receipt 
            receiptData={receiptData} 
            selectedOneReceipt={selectedOneReceipt}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Reception;
