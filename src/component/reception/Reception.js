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
import ReceiptList from "./../receipt/ReceiptList";

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

  const [reception_id, setReception_id] = useState(0);
  const [patient_name, setPatient_name] = useState("");
  // searchRange[];

  const receptionRecordSearch = (
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
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <WaitingQueueLayout
            initPanel="3"
            nextState="수납완료"
            clickRowCallback={({ reception_id, patient_id, patient_name }) => {
              setPatient_id(patient_id);
              setPatient_name(patient_name);
              setReception_id(reception_id);
            }}
          />
        </Grid>

        <Grid item xs={7.5}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper elevation={3}>
                receptionRecordSearch={receptionRecordSearch}
                patient_name={patient_name}
              />
            </Grid>
            <Grid item xs={12} >
              <Paper elevation={3} sx={{ height: "42vh", display: "flex", justifyContent: "space-between" }}>
                <Grid item xs={6}>
                  <DailyReservationList
                    setSelectedReservationDetails={
                      setSelectedReservationDetails
                    }
                    setPatientData={setPatientData}
                    setReceptionData={setReceptionData}
                  />
                </Grid>
                <Grid item xs={6}>
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
                    <Grid xs={12}>
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
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={2.5}>
            <Receipt reception_id={reception_id} />
        </Grid>
      </Grid>
    </>
  );
};

export default Reception;
