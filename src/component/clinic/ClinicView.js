import { Grid, Paper } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DrugTaking from "./Drug_Taking";
import MedicalInfo from "./MedicalInfo";
import MedicalRecordInquiry from "./MedicalRecordInquiry";
import Patient from "./Patient";
import Queue from "./Queue";
import Underlying from "./Underlying";
import Clinic from "./Clinic";
import DiseaseModel from "./model/DiseaseModel";

const ClinicView = () => {
  const [reception, setReception] = useState(1);
  const [patient, setPatient] = useState({});
  const [underlying, onInsert, onDelete, onAppend, onReset] = DiseaseModel();
  const [drug_taking, setDrug_taking] = useState([]);
  const [mri, setMri] = useState([]);
  const [medicalInfo, setMedicalInfo] = useState({});

  useEffect(() => {
    axios
      .get(`/api/clinic/${reception}`)
      .then((response) => {
        setPatient(response.data);
        onAppend(response.data.underlyingList);
        setDrug_taking(response.data.drug_takingList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [reception]);

  useEffect(() => {
    axios
      .get(`/api/clinic/mri/${1}`)
      .then((response) => {
        setMri(response.data);
      })
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
            <MedicalRecordInquiry
              mri={mri}
              setPatient={setPatient}
              setMedicalInfo={setMedicalInfo}
            />
          </Grid>
          <Grid item xs={5.9} style={{ height: "50vh" }}>
            <Paper sx={{ height: "45vh" }} elevation={3}>
              <Patient reception={reception} patient={patient} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Underlying props={underlying} onInsert={onInsert} />
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
            <MedicalInfo medicalInfo={medicalInfo} />
          </Grid>
          <Grid item xs={5.9} style={{ height: "50vh" }}>
            <Paper elevation={3} sx={{ height: "50vh" }}>
              <Clinic
                setPatient={setPatient}
                setReception={setReception}
                onReset={onReset}
              />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ClinicView;
