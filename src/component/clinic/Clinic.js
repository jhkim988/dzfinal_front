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

const Clinic = ({
  setPatient,
  setReception,
  onReset,
  mode,
  diagnosiss,
  prescriptions,
  medicalInfo,
}) => {
  const [doctor, setDoctor] = useState(0);
  const [symptom, setSymptom] = useState("");
  const [treatment, setTreatment] = useState(false);
  const [clinic_request, setClinic_request] = useState(false);
  const [diagnosis, setDiagnosis] = useState(diagnosiss);
  const [prescription, setPrescription] = useState(prescriptions);

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
    setDoctor(1);
    const diseaseIds = diagnosis.map((item) => item.disease_id);
    const drugIds = prescription.map((item) => item.drug_id);

    if(mode == 1) {

    }
    axios
      .post("/api/clinic/clinic", {
        reception_id: 53,
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
    setSymptom("");
    setTreatment(false);
    setClinic_request(false);
    setDiagnosis([]);
    setPrescription([]);
    // setPatient();
    // setReception();
    // onReset();
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
            medicalInfo={medicalInfo}
            mode={mode}
          />
        </Grid>
        <Grid item xs={6} style={{ paddingTop: 0 }}>
          <Prescription
            handlePrescriptionAdd={handlePrescriptionAdd}
            prescription={prescription}
            handlePrescriptionRemove={handlePrescriptionRemove}
            medicalInfo={medicalInfo}
            mode={mode}
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
            value={mode >= 1 ? symptom || medicalInfo.symptom : symptom}
            onChange={handleSymptomChange}
          />
        </>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={mode >= 1 ? medicalInfo.treatment : treatment}
                  onChange={(e) => setTreatment(e.target.checked)}
                />
              }
              label="처치"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={
                    mode >= 1 ? medicalInfo.clinic_request : clinic_request
                  }
                  onChange={(e) => setClinic_request(e.target.checked)}
                />
              }
              label="진료의뢰서"
            />
          </Box>
          <>
            <Stack spacing={2} direction="row">
              <Button variant="contained" onClick={onClick}>
                {mode === 1 ? "등록" : "수정"}
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

export default Clinic;
