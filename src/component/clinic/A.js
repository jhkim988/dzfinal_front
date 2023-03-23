import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import Diagnosis from "./Diagnosis";
import Prescription from "./Prescription";

const A = () => {
  const [doctor, setDoctor] = useState(0);
  const [symptom, setSymptom] = useState("");
  const [treatment, setTreatment] = useState(false);
  const [clinic_request, setClinic_request] = useState(false);
  const [diagnosis, setDiagnosis] = useState([]);
  const [prescription, setPrescription] = useState([]);

  const handleDiagnosisAdd = (disease) => {
    console.log(disease);

    if (diagnosis.some((item) => item.disease_id === disease.disease_id)) {
      alert("이미 추가된 질병입니다.");
    } else {
      setDiagnosis((prev) => [...prev, disease]);
    }
  };

  const handlePrescriptionAdd = (drug) => {
    if (prescription.some((item) => item.drug_id === drug.drug_id)) {
      alert("이미 추가된 약품입니다.");
    } else {
      setPrescription((prev) => [...prev, drug]);
    }
  };

  function handleDiagnosisRemove(disease_id) {
    const newDiagnosis = diagnosis.filter(
      (disease) => disease.disease_id !== disease_id
    );
    setDiagnosis(newDiagnosis);
  }

  function handlePrescriptionRemove(drug_id) {
    const newPrescription = prescription.filter(
      (drug) => drug.drug_id !== drug_id
    );
    setPrescription(newPrescription);
  }

  const handleSymptomChange = (e) => {
    setSymptom(e.target.value);
  };

  const handleSymptomSubmit = (e) => {
    e.preventDefault();
  };

  const onClick = () => {
    setDoctor(4);
    const diseaseIds = diagnosis.map((item) => item.disease_id);
    const drugIds = prescription.map((item) => item.drug_id);

    console.log(diseaseIds);
    console.log(drugIds);

    axios
      .post("/api/clinic/c", {
        reception_id: 1,
        symptom: symptom,
        treatment: treatment,
        clinic_request: clinic_request,
        creator: doctor,
        disease_ids: diseaseIds,
        drug_ids: drugIds,
      })
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const onCancel = () => {};

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6} style={{ paddingTop: 0 }}>
          <Diagnosis
            handleDiagnosisAdd={handleDiagnosisAdd}
            diagnosis={diagnosis}
            handleDiagnosisRemove={handleDiagnosisRemove}
          />
        </Grid>
        <Grid item xs={6} style={{ paddingTop: 0 }}>
          <Prescription
            handlePrescriptionAdd={handlePrescriptionAdd}
            prescription={prescription}
            handlePrescriptionRemove={handlePrescriptionRemove}
          />
        </Grid>
      </Grid>
      <form onSubmit={handleSymptomSubmit}>
        <>
          증상
          <TextField
            sx={{ width: "100%" }}
            multiline
            rows={4}
            value={symptom}
            onChange={handleSymptomChange}
          />
        </>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={treatment}
                  onChange={(e) => setTreatment(e.target.checked)}
                />
              }
              label="처치"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={clinic_request}
                  onChange={(e) => setClinic_request(e.target.checked)}
                />
              }
              label="진료의뢰서"
            />
          </Box>
          <>
            <Stack spacing={2} direction="row">
              <Button variant="contained" onClick={onClick}>
                확인
              </Button>
              <Button variant="outlined" onClick={onCancel}>
                취소
              </Button>
            </Stack>
          </>
        </Box>
      </form>
    </>
  );
};

export default A;
