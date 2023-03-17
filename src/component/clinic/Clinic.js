import { Box, Button, Checkbox, FormControlLabel, Grid, Paper, styled, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Diagnosis from './Diagnosis';
import Drug_Taking from './Drug_Taking';
import MedicalInfo from './MedicalInfo';
import MedicalRecordInquiry from './MedicalRecordInquiry';
import Patient from './Patient';
import Prescription from './Prescription';
import Queue from './Queue';
import Underlying from './Underlying';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Clinic = () => {
    const [reception, setReception] = useState('1');
    const [patient, setPatient] = useState({});
    const [underlying, setUnderlying] = useState([]);
    const [drug_taking, setDrug_taking] = useState([]);

    useEffect(() => {
        axios.get(`/api/clinic/${reception}`)
            .then(response => {
                setPatient(response.data);
                setUnderlying(response.data.underlyingList);
                setDrug_taking(response.data.drug_takingList);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <Grid container spacing={2}>
            <Grid item xs={2} style={{ height: '100vh' }}>
                <Paper sx={{marginTop: 2, height: '98vh'}}>
                    <Queue/>
                </Paper>
            </Grid>
            <Grid item xs={10} style={{ height: '100vh' }}>
                <Grid container spacing={2}>
                    <Grid item xs={5.9} style={{ height: '50vh' }}>
                        <MedicalRecordInquiry/>
                    </Grid>
                    <Grid item xs={5.9} style={{ height: '50vh' }}>
                        <Paper sx={{marginTop: 2, height: '45vh'}} elevation={3}>
                            <Patient reception={reception} patient={patient} />
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Underlying underlying={underlying} />
                                </Grid>
                                <Grid item xs={6}>
                                    <Drug_Taking drug_taking={drug_taking} />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={5.9} style={{ height: '50vh' }}>
                        <MedicalInfo/>
                    </Grid>
                    <Grid item xs={5.9} style={{ height: '50vh' }}>
                        <Paper elevation={3} sx={{ height: '50vh', marginTop: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={6} style={{ paddingTop: 0 }}>
                                    <Diagnosis />
                                </Grid>
                                <Grid item xs={6} style={{ paddingTop: 0 }}>
                                    <Prescription />
                                </Grid>
                            </Grid>
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
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Clinic;