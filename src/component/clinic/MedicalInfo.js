import React from "react";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

const MedicalInfo = ({
  medicalInfo,
  setMode,
  setDiagnosis,
  setPrescription,
  setSymptom,
  setTreatment,
  setClinic_request,
}) => {
  const copyMedicalInfo = () => {
    if (!medicalInfo) {
      return;
    }
    setDiagnosis(medicalInfo.diagnosis);
    setPrescription(medicalInfo.prescription);
    setSymptom(medicalInfo.symptom);
    setTreatment(medicalInfo.treatment);
    setClinic_request(medicalInfo.clinic_request);
  };

  const onCopy = () => {
    copyMedicalInfo();
    setMode(1);
  };

  const onUpdate = () => {
    copyMedicalInfo();
    setMode(2);
  };

  return (
    <Paper>
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="subtitle2" sx={{ marginLeft: 2 }}>
              내원기록 상세보기
            </Typography>
          </Box>
          <Box sx={{ marginTop: 1 }}>
            <Button
              variant="contained"
              color="success"
              size="small"
              sx={{ marginRight: 2 }}
              onClick={onCopy}
            >
              복사
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{ marginRight: 2 }}
              onClick={onUpdate}
            >
              수정
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sx={{ marginTop: 2 }}>
          <Box sx={{ display: "flex" }}>
            <TextField
              disabled
              size="small"
              value={medicalInfo.created_at || ""}
              label="진료날짜"
              sx={{ marginLeft: 1, marginRight: 1 }}
              InputLabelProps={{
                style: { color: "black" },
              }}
            />
            <TextField
              disabled
              size="small"
              value={medicalInfo.employee_name || ""}
              label="담당의"
              sx={{ marginLeft: 1, marginRight: 1 }}
              InputLabelProps={{
                style: { color: "black" },
              }}
            />
            <TextField
              disabled
              size="small"
              value={medicalInfo.patient_name || ""}
              label="환자이름"
              sx={{ marginLeft: 1, marginRight: 1 }}
              InputLabelProps={{
                style: { color: "black" },
              }}
            />
            <TextField
              disabled
              size="small"
              value={medicalInfo.front_registration_number || ""}
              label="앞자리"
              sx={{ marginLeft: 1, marginRight: 1 }}
              InputLabelProps={{
                style: { color: "black" },
              }}
            />
          </Box>
          <Box sx={{ display: "flex", marginTop: 1 }}>
            <TextField
              disabled
              size="small"
              value={medicalInfo.height || ""}
              label="키"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">cm</InputAdornment>
                ),
              }}
              sx={{ marginLeft: 1, marginRight: 1 }}
              InputLabelProps={{
                style: { color: "black" },
              }}
            />
            <TextField
              disabled
              size="small"
              value={medicalInfo.weight || ""}
              label="체중"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">kg</InputAdornment>
                ),
              }}
              sx={{ marginLeft: 1, marginRight: 1 }}
              InputLabelProps={{
                style: { color: "black" },
              }}
            />
            <TextField
              disabled
              size="small"
              value={medicalInfo.bmi || ""}
              label="BMI"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">kg/㎡</InputAdornment>
                ),
              }}
              sx={{ marginLeft: 1, marginRight: 1, width: "260px" }}
              InputLabelProps={{
                style: { color: "black" },
              }}
            />
            <TextField
              disabled
              size="small"
              value={
                medicalInfo.diastolic && medicalInfo.systolic
                  ? `${medicalInfo.diastolic}/${medicalInfo.systolic}`
                  : ""
              }
              label="혈압"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">mmHg</InputAdornment>
                ),
              }}
              sx={{ marginLeft: 1, marginRight: 1, width: "300px" }}
              InputLabelProps={{
                style: { color: "black" },
              }}
            />
            <TextField
              disabled
              size="small"
              value={medicalInfo.blood_sugar || ""}
              label="혈당"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">mg/dL</InputAdornment>
                ),
              }}
              sx={{ marginLeft: 1, marginRight: 1 }}
              InputLabelProps={{
                style: { color: "black" },
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ margin: 1 }}>
            진단
            <Box
              sx={{
                border: "1px solid gray",
                borderRadius: 1,
                height: "115px",
                overflowY: "auto",
              }}
            >
              {medicalInfo.diagnosis &&
                medicalInfo.diagnosis.length > 0 &&
                medicalInfo.diagnosis.map((item, index) => (
                  <div key={index}>{item.disease_name}</div>
                ))}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ margin: 1 }}>
            처방
            <Box
              sx={{
                border: "1px solid gray",
                borderRadius: 1,
                height: "115px",
                overflowY: "auto",
              }}
            >
              {medicalInfo.prescription &&
                medicalInfo.prescription.length > 0 &&
                medicalInfo.prescription.map((item, index) => (
                  <div key={index}>{item.drug_name}</div>
                ))}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ margin: 1, height: "100%" }}>
            <TextField
              disabled
              sx={{ width: "100%" }}
              label="증상"
              multiline
              rows={2}
              value={medicalInfo.symptom || ""}
            />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default React.memo(MedicalInfo);
