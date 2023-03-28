import { Paper, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import AutoCompleteForm from './AutoCompleteForm';
import DailyReservationList from './DailyReservationList';
import PatientForm from './PatientForm';
import ReceptionForm from './ReceptionForm';
import Receipt from '../receipt/Receipt';
import WaitingQueue from '../waiting/WaitingQueue';
import ReceptionList from './ReceptionList';
import WaitingQueueLayout from './../waiting/WaitingQueueLayout';

const Reception = () => {
  const [patient_id, setPatient_id] = useState(null);
  const [selectedReservationDetails, setSelectedReservationDetails] = useState({});
  const [selectedAddress, setSelectedAddress] = useState({
    zip_code: '',
    address: ''
  });
  const [patientData, setPatientData] = useState({
    patient_name: '',
    front_registration_number: '',
    back_registration_number: '',
    gender: '',
    phone_number1: '',
    phone_number2: '',
    phone_number3: '',
    insurance: '',
    zip_code: '',
    address: '',
    detail_address: '',
    insurance: 'true'
  });
  const [receptionData, setReceptionData] = useState({
    doctor: '',
    treatment_reason: '',
    systolic: '',
    diastolic: '',
    blood_sugar: '',
    height: '',
    weight: '',
    bmi: ''
  });

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <WaitingQueueLayout sx={{ width: 260 }} initPanel="3" nextState="수납중"/>
        </Grid>
        <Grid item xs={7}>
          <AutoCompleteForm setPatientData={setPatientData} setReceptionData={setReceptionData} />
          <Paper>
            <Grid container>
              <Grid item xs={6}>
                <DailyReservationList setSelectedReservationDetails={setSelectedReservationDetails} setPatientData={setPatientData} setReceptionData={setReceptionData} />
              </Grid>
              <Grid item xs={6}>
                <Grid containter>
                  <Grid item xs={12}>
                    <PatientForm setPatient_id={setPatient_id}
                      setReceptionData={setReceptionData}
                      selectedReservationDetails={selectedReservationDetails}
                      patientData={patientData}
                      setPatientData={setPatientData}
                      selectedAddress={selectedAddress}
                      setSelectedAddress={setSelectedAddress}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ReceptionForm patient_id={patient_id}
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
        <Grid item xs={3}>
          <Receipt />
        </Grid>
      </Grid>

    </>

  );
};

export default Reception;