import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import { Stack } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import A from "./A";
import Diagnosis from "./Diagnosis";
import DrugTaking from "./Drug_Taking";
import MedicalInfo from "./MedicalInfo";
import MedicalRecordInquiry from "./MedicalRecordInquiry";
import Patient from "./Patient";
import Prescription from "./Prescription";
import Queue from "./Queue";
import Underlying from "./Underlying";

const Clinic = () => {
  const [reception, setReception] = useState("");
  const [patient, setPatient] = useState({});
  const [underlying, setUnderlying] = useState([]);
  const [drug_taking, setDrug_taking] = useState([]);

  useEffect(() => {
    setReception("1");
    axios
      .get(`/api/clinic/${reception}`)
      .then((response) => {
        setPatient(response.data);
        setUnderlying(response.data.underlyingList);
        setDrug_taking(response.data.drug_takingList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [reception]);

  useEffect(() => {
    axios
      .get()
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={2} style={{ height: "90vh" }}>
        <Paper sx={{ height: "90vh" }}>
          <Queue />
        </Paper>
      </Grid>
      <Grid item xs={10} style={{ height: "100vh" }}>
        <Grid container spacing={2}>
          <Grid item xs={5.9} style={{ height: "50vh" }}>
            <MedicalRecordInquiry />
          </Grid>
          <Grid item xs={5.9} style={{ height: "50vh" }}>
            <Paper sx={{ height: "45vh" }} elevation={3}>
              <Patient reception={reception} patient={patient} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Underlying props={underlying} />
                </Grid>
                <Grid item xs={6}>
                  <DrugTaking props={drug_taking} />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={5.9} style={{ height: "50vh" }}>
            <MedicalInfo />
          </Grid>
          <Grid item xs={5.9} style={{ height: "50vh" }}>
            <Paper elevation={3} sx={{ height: "50vh" }}>
              <A />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Clinic;
