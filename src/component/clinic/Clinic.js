import { Box, Button, Checkbox, FormControlLabel, FormGroup, Paper, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Diagnosis from './Diagnosis';
import Drug_Taking from './Drug_Taking';
import Patient from './Patient';
import Prescription from './Prescription';
import Underlying from './Underlying';

const Clinic = () => {
    const [reception, setReception] = useState('1');
    const [patient, setPatient] = useState([]);
    const [underlying, setUnderlying] = useState([]);
    const [drug_taking, setDrug_taking] = useState([]);

    useEffect(() => {
        axios.get(`/api/clinic/loadpatient?id=${reception}`)
            .then(response => {
                setPatient(response.data.patient);
                setUnderlying(response.data.underlying);
                setDrug_taking(response.data.drug_taking);

                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <>
            <Paper sx={{margin: 2}} elevation={3}>
                <Patient reception={reception} patient={patient} />
                <Box sx={{display: 'flex'}}>
                    <Underlying underlying={underlying} />
                    <Drug_Taking drug_taking={drug_taking} />
                </Box>
            </Paper>
            <Paper sx={{margin: 2}} elevation={3}>
                <Box sx={{display: 'flex'}}>
                    <Diagnosis />
                    <Prescription />
                </Box>
                <>
                    증상
                    <TextField sx={{width: '100%'}} multiline rows={4} defaultValue=""/>
                </>
                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Box>
                        <FormControlLabel control={<Checkbox />} label="처치" />
                        <FormControlLabel control={<Checkbox />} label="진료의뢰서" />
                    </Box>
                    <>
                        <Stack spacing={2} direction="row">
                            <Button variant="contained">확인</Button>
                            <Button variant="outlined">취소</Button>
                        </Stack>
                    </>
                </Box>
            </Paper>
        </>
    );
};

export default Clinic;