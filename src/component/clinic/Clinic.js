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
import React from "react";
import Diagnosis from "./Diagnosis";
import Prescription from "./Prescription";
import axiosClient from "./../login/AxiosClient";

const Clinic = ({
  state,
  setState,
  setPatient,
  setReception,
  reception,
  onReset,
  setDrug_taking,
  mode,
  setMode,
  medicalInfo,
  diagnosis,
  prescription,
  setDiagnosis,
  setPrescription,
  symptom,
  setSymptom,
  setMedicalInfo,
  treatment,
  setTreatment,
  clinic_request,
  setClinic_request,
}) => {
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

  const handleTreatmentChange = (event) => {
    setTreatment(event.target.checked);
  };

  const handleClinicRequestChange = (event) => {
    setClinic_request(event.target.checked);
  };

  const onClick = () => {
    console.log(mode+ "/"+ state);
    if (mode === 0) {
      if (state !== "진료중") {
        alert("진료중인 환자가 없습니다.");
        return;
      }

      const diseaseIds = diagnosis.map((disease) => disease.disease_id);
      const drugIds = prescription.map((drug) => drug.drug_id);

      axiosClient
        .post("/api/clinic/clinic", {
          reception_id: reception,
          symptom: symptom,
          treatment: treatment,
          clinic_request: clinic_request,
          creator: 1,
          disease_ids: diseaseIds,
          drug_ids: drugIds,
        })
        .then((resp) => {
          if (resp.data === true) {
            alert("진료 완료");
          } else if (resp.response.status === 500) {
            alert("오류");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (mode === 1) {
      if (state !== "진료중") {
        alert("진료중인 환자가 없습니다.");
        return;
      }
      setSymptom(medicalInfo.symptom);
      setDiagnosis(medicalInfo.diagnosis);
      setClinic_request(medicalInfo.clinic_request);

      const diseaseIds = diagnosis.map((disease) => disease.disease_id);
      const drugIds = prescription.map((drug) => drug.drug_id);

      axiosClient
        .post("/api/clinic/clinic", {
          reception_id: reception,
          symptom: symptom,
          treatment: treatment,
          clinic_request: clinic_request,
          creator: 1,
          disease_ids: diseaseIds,
          drug_ids: drugIds,
        })
        .then((resp) => {
          if (resp.data === true) {
            alert("진료 완료");
          } else if (resp.response.status === 500) {
            alert("오류");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (mode === 2) {
      setSymptom(medicalInfo.symptom);
      setDiagnosis(medicalInfo.diagnosis);
      setPrescription(medicalInfo.prescription);

      const diseaseIds = diagnosis.map((disease) => disease.disease_id);
      const drugIds = prescription.map((drug) => drug.drug_id);

      axiosClient
        .put("/api/clinic/clinic", {
          reception_id: medicalInfo.reception_id,
          symptom: symptom,
          treatment: treatment,
          clinic_request: clinic_request,
          updator: 1,
          disease_ids: diseaseIds,
          drug_ids: drugIds,
        })
        .then((response) => {
          if (response.data === true) {
            alert("진료 수정");
          } else {
            alert("오류");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    setMode(0);
    setState("");
    setReception();
    setPatient({});
    onReset();
    setDrug_taking([]);
    setSymptom("");
    setTreatment(false);
    setClinic_request(false);
    setDiagnosis([]);
    setPrescription([]);
    setMedicalInfo({});
  };

  const onCancel = () => {
    setMode(0);
    setState("");
    setReception();
    setPatient({});
    onReset();
    setDrug_taking([]);
    setSymptom("");
    setTreatment(false);
    setClinic_request(false);
    setDiagnosis([]);
    setPrescription([]);
  };

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
      <Box sx={{ margin: 1 }}>
        <TextField
          sx={{ width: "100%" }}
          label="증상"
          multiline
          rows={2}
          value={symptom}
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
                checked={treatment}
                onChange={handleTreatmentChange}
                name="treatment"
              />
            }
            label="처치"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={clinic_request}
                onChange={handleClinicRequestChange}
                name="clinic_request"
              />
            }
            label="진료의뢰서"
          />
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <Stack spacing={2} direction="row">
            <Button variant="contained" onClick={onClick}>
              {mode !== 2 ? "등록" : "수정"}
            </Button>
            <Button variant="outlined" onClick={onCancel}>
              취소
            </Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default Clinic;
