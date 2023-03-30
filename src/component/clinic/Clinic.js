import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import Diagnosis from "./Diagnosis";
import Prescription from "./Prescription";

const Clinic = ({ reception, mode, medicalInfo, setMedicalInfo }) => {
  const [doctor, setDoctor] = useState(0);
  const [symptom, setSymptom] = useState("");
  const [treatment, setTreatment] = useState(false);
  const [clinic_request, setClinic_request] = useState(false);
  const [diagnosis, setDiagnosis] = useState([]);
  const [prescription, setPrescription] = useState([]);

  const handleDiagnosisAdd = (disease) => {
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

    if (mode === 1) {
      const diseaseIds = diagnosis.map((disease) => disease.disease_id);
      const drugIds = prescription.map((drug) => drug.drug_id);

      axios
        .post("/api/clinic/clinic", {
          reception_id: reception,
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
    } else if (mode === 2) {
      setDiagnosis(medicalInfo.diagnosis);
      setPrescription(medicalInfo.prescription);

      const diseaseIds = diagnosis.map((disease) => disease.disease_id);
      const drugIds = prescription.map((drug) => drug.drug_id);

      axios
        .put("/api/clinic/clinic", {
          reception_id: medicalInfo.reception_id,
          symptom: symptom,
          treatment: treatment,
          clinic_request: clinic_request,
          updator: doctor,
          disease_ids: diseaseIds,
          drug_ids: drugIds,
        })
        .then((response) => {})
        .catch((error) => {
          console.log(error);
        });
    }

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
      <Typography variant="subtitle2" sx={{ marginLeft: 2 }}>
        진료
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Diagnosis
            handleDiagnosisAdd={handleDiagnosisAdd}
            diagnosis={diagnosis}
            handleDiagnosisRemove={handleDiagnosisRemove}
            medicalInfo={medicalInfo}
            mode={mode}
          />
        </Grid>
        <Grid item xs={6}>
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
        <Box sx={{ margin: 1 }}>
          <TextField
            sx={{ width: "100%" }}
            label="증상"
            multiline
            rows={2}
            value={mode >= 1 ? symptom || medicalInfo.symptom : symptom}
            onChange={handleSymptomChange}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            margin: 1,
          }}
        >
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={mode >= 1 ? medicalInfo.treatment : treatment}
                  onChange={(e) => {
                    if (mode >= 1) {
                      setMedicalInfo({
                        ...medicalInfo,
                        treatment: e.target.checked,
                      });
                    } else {
                      setTreatment(e.target.checked);
                    }
                  }}
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
                  onChange={(e) => {
                    if (mode >= 1) {
                      setMedicalInfo({
                        ...medicalInfo,
                        clinic_request: e.target.checked,
                      });
                    } else {
                      setClinic_request(e.target.checked);
                    }
                  }}
                />
              }
              label="진료의뢰서"
            />
          </Box>
          <>
            <Stack spacing={2} direction="row">
              <Button variant="contained" onClick={onClick}>
                {mode !== 2 ? "등록" : "수정"}
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
