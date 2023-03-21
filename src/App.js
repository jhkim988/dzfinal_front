import { Paper } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import AutoCompleteForm from './components/AutoCompleteForm';
import DailyReservationList from './components/DailyReservationList';
import PatientForm from './components/PatientForm';
import ReceptionForm from './components/ReceptionForm';
import Test from './components/Test';

function App() {
  const [patient_id, setPatient_id] = useState(null);
  const [selectedReservationDetails, setSelectedReservationDetails] = useState({});
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
    insurance: ''
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
    <div style={{ width: "900px", height: "400px" }}>
      <AutoCompleteForm setPatientData={setPatientData} setReceptionData={setReceptionData} />
      {/* <Test /> */}
      <Paper>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <DailyReservationList setSelectedReservationDetails={setSelectedReservationDetails} setPatientData={setPatientData} setReceptionData={setReceptionData} />
          <Box>
            <PatientForm setPatient_id={setPatient_id} setReceptionData={setReceptionData} selectedReservationDetails={selectedReservationDetails} patientData={patientData} setPatientData={setPatientData} />
            <ReceptionForm patient_id={patient_id} receptionData={receptionData} setReceptionData={setReceptionData} patientData={patientData} />
          </Box>
        </Box>
      </Paper>
      {/* <ReceptionList /> */}
    </div>
  );
}

export default App;
