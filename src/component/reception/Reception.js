import { Grid, Paper } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import axios from "axios";
import AutoCompleteForm from "./AutoCompleteForm";
import DailyReservationList from "./DailyReservationList";
import PatientForm from "./PatientForm";
import ReceptionForm from "./ReceptionForm";
import Receipt from "../receipt/Receipt";
import WaitingQueue from "../waiting/WaitingQueue";
import ReceptionList from "./ReceptionList";
import WaitingQueueLayout from "./../waiting/WaitingQueueLayout";
import ReceiptList from "../receipt/ReceiptList";

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

  const clickRowCallback = async({ reception_id, patient_id }) => {
    setPatient_id(patient_id);
    try {
      axios.get(`/api/reception/detail/${reception_id}`).then(({ data }) => {
        setPatientData(data.patient)
        setReceptionData(data.reception);
        setReceiptData(data);
        console.log(data);
      });
    } catch(error) {
      console.log(error);
    }
  }

  // 수납내역목록 검색
  const receiptRecordSearch = (
    { start, end, type, searchText },
    callback
  ) => {
    console.log(start?.format("YYYY-MM-DD"));
    console.log(end?.format("YYYY-MM-DD"));
    axios
      .post(
        "/api/receipt/getReceiptList",
        {
          type,
          searchText,
          start_date: start?.format("YYYY-MM-DD"),
          end_date: end?.format("YYYY-MM-DD"),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        callback(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
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
  });


  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <WaitingQueueLayout
            initPanel="3"
            nextState="수납중"
            clickRowCallback={clickRowCallback}
            // clickRowCallback={({ reception_id, patient_id }) => {
            //   setPatient_id(patient_id);
            //   axios.get(`/api/reception/detail/${reception_id}`).then(({ data }) => {
            //     setPatientData(data.patient)
            //     setReceptionData(data.reception);
            //     setReceiptData(data);
            //     console.log(data);
            //   });
            // }}
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
                  // setSelectedOneReceipt={setSelectedOneReceipt}
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
            // selectedOneReceipt={selectedOneReceipt}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Reception;
