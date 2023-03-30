import { Grid, Paper } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import DrugTaking from "./Drug_Taking";
import MedicalInfo from "./MedicalInfo";
import MedicalRecordInquiry from "./MedicalRecordInquiry";
import Patient from "./Patient";
import Underlying from "./Underlying";
import Clinic from "./Clinic";
import DiseaseModel from "./model/DiseaseModel";
import WaitingQueueLayout from "./../waiting/WaitingQueueLayout";

const ClinicView = () => {
  const [reception, setReception] = useState(1);
  const [patient, setPatient] = useState({});
  const [underlying, onInsert, onDelete, onAppend, onReset] = DiseaseModel();
  const [drug_taking, setDrug_taking] = useState([]);
  const [mri, setMri] = useState([]);
  const [medicalInfo, setMedicalInfo] = useState({});
  const [mode, setMode] = useState(0);
  const [diagnosis, setDiagnosis] = useState([]);
  const [prescription, setPrescription] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/clinic/1`)
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

  const clickMedicalRecordInquiry = useCallback(
    (type, formattedDates, keyword) => {
      if (!type) return alert("분류를 정해주세요");
      console.log(formattedDates.start + "/" + formattedDates.end);
      axios
        .post(
          "/api/clinic/mri/search",
          {
            type: type,
            start: formattedDates?.start || "",
            end: formattedDates?.end || "",
            keyword: keyword,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          setMri(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    []
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={2} style={{ height: "90vh" }}>
        <WaitingQueueLayout
          initPanel="2"
          nextState="진료중"
          clickRowCallback={({ reception_id, patient_name }) => {
            setReception(reception_id);
            clickMedicalRecordInquiry("patient_name", {}, patient_name);
          }}
        />
      </Grid>
      <Grid item xs={10} style={{ height: "100vh" }}>
        <Grid container spacing={2}>
          <Grid item xs={5.9} style={{ height: "50vh" }}>
            <MedicalRecordInquiry
              mri={mri}
              setMri={setMri}
              setMedicalInfo={setMedicalInfo}
              clickMedicalRecordInquiry={clickMedicalRecordInquiry}
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
            <MedicalInfo
              medicalInfo={medicalInfo}
              setMode={setMode}
              setDiagnosis={setDiagnosis}
              setPrescription={setPrescription}
            />
          </Grid>
          <Grid item xs={5.9} style={{ height: "50vh" }}>
            <Paper elevation={3} sx={{ height: "50vh" }}>
              <Clinic
                setPatient={setPatient}
                setReception={setReception}
                reception={reception}
                onReset={onReset}
                mode={mode}
                medicalInfo={medicalInfo}
                diagnosis={diagnosis}
                prescription={prescription}
              />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ClinicView;
