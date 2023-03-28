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
            <div style={{ width: "900px", height: "620px" }}>
                {/* <AutoCompleteForm setPatientData={setPatientData} setReceptionData={setReceptionData} /> */}

                {/* <Test /> */}

                <Paper>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <DailyReservationList setSelectedReservationDetails={setSelectedReservationDetails} setPatientData={setPatientData} setReceptionData={setReceptionData} />
                        <Box sx={{ width: 475, padding: 2 }}>

                            <PatientForm setPatient_id={setPatient_id}
                                setReceptionData={setReceptionData}
                                selectedReservationDetails={selectedReservationDetails}
                                patientData={patientData}
                                setPatientData={setPatientData}
                                selectedAddress={selectedAddress}
                                setSelectedAddress={setSelectedAddress}
                            />
                            <ReceptionForm patient_id={patient_id}
                                receptionData={receptionData}
                                setReceptionData={setReceptionData}
                                patientData={patientData}
                                setPatientData={setPatientData}
                                setSelectedAddress={setSelectedAddress}
                            />
                        </Box>
                    </Box>
                    {/* <ChatList style={{ width: "300px", height: "510px", border: 1 }} />
                <ChatRoom /> */}
                </Paper>
                {/* <ReceptionList /> */}
            </div>
        </>

  );
};

export default Reception;