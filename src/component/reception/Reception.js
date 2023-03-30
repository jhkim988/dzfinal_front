import { Grid, Paper } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
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

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <WaitingQueueLayout
            initPanel="3"
            nextState="수납완료"
            clickRowCallback={() => { }}
          />
        </Grid>

        <Grid item xs={7.5}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ReceiptList />
            </Grid>
            <Grid item xs={12}>
              <Paper sx={{ height: "42vh", display: "flex", justifyContent: "space-between" }}>
                <Grid container spacing={2}>
                  <Grid item xs={5}>
                    <DailyReservationList
                      setSelectedReservationDetails={
                        setSelectedReservationDetails
                      }
                      setPatientData={setPatientData}
                      setReceptionData={setReceptionData}
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
          <Receipt />
        </Grid>
      </Grid>

      {/* <Grid container spacing={2}>
        <Paper sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid item xs={6} style={{ paddingTop: 0 }}>
            <DailyReservationList
              setSelectedReservationDetails={setSelectedReservationDetails}
              setPatientData={setPatientData}
              setReceptionData={setReceptionData}
            />
          </Grid>
          <Grid item xs={6} style={{ paddingTop: 0 }}>
            <Box>
              <PatientForm
                setPatient_id={setPatient_id}
                setReceptionData={setReceptionData}
                selectedReservationDetails={selectedReservationDetails}
                patientData={patientData}
                setPatientData={setPatientData}
                selectedAddress={selectedAddress}
                setSelectedAddress={setSelectedAddress}
              />
              <ReceptionForm
                patient_id={patient_id}
                receptionData={receptionData}
                setReceptionData={setReceptionData}
                patientData={patientData}
                setPatientData={setPatientData}
                setSelectedAddress={setSelectedAddress}
              />
            </Box>
          </Grid>
        </Paper>
        {/* <ReceptionList /> */}
      {/* </Grid> */}
    </>
  );
};

export default Reception;
