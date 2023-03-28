import React from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";

const MedicalInfo = ({
  medicalInfo,
  setMode,
  setDiagnosis,
  setPrescription,
}) => {
  function createData(name, unit) {
    return { name, unit };
  }

  const rows = [
    createData(
      "진료날짜",
      medicalInfo.created_at ? medicalInfo.created_at : ""
    ),
    createData(
      "담당의",
      medicalInfo.employee_name ? medicalInfo.employee_name : ""
    ),
    createData(
      "혈압",
      medicalInfo.diastolic && medicalInfo.systolic
        ? `${medicalInfo.diastolic}/${medicalInfo.systolic}`
        : ""
    ),
    createData("혈당", medicalInfo.blood_sugar ? medicalInfo.blood_sugar : ""),
    createData("키", medicalInfo.height ? medicalInfo.height + "cm" : ""),
    createData("체중", medicalInfo.weight ? medicalInfo.weight + "kg" : ""),
    createData("BMI", medicalInfo.bmi ? medicalInfo.bmi : ""),
    createData(
      "내원사유",
      medicalInfo.treatment_reason ? medicalInfo.treatment_reason : ""
    ),
  ];

  const onCopy = () => {
    setMode(1);
    setDiagnosis(medicalInfo.diagnosis);
    setPrescription(medicalInfo.prescription);
  };

  const onUpdate = () => {
    setMode(2);
    setDiagnosis(medicalInfo.diagnosis);
    setPrescription(medicalInfo.prescription);
  };

  return (
    <Paper>
      <Grid container>
        <Grid item xs={12}>
          <Box>내원기록 상세보기</Box>
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "end" }}>
          <Button
            variant="contained"
            color="success"
            sx={{ marginRight: 2 }}
            onClick={onCopy}
          >
            복사
          </Button>
          <Button
            variant="contained"
            sx={{ marginRight: 2 }}
            onClick={onUpdate}
          >
            수정
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Table size="small" aria-label="a dense table">
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ padding: "6px 6px", borderBottom: "0px" }}
                  >
                    {row.name}
                  </TableCell>
                  <TableCell
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      borderBottom: "0px",
                    }}
                  >
                    <TextField
                      variant="outlined"
                      size="small"
                      value={row.unit}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
        <Grid item xs={6}>
          <Box>
            <Box sx={{ margin: 1, height: "33%" }}>
              진단
              <Box
                sx={{
                  border: 1,
                  borderRadius: 1,
                  height: "100px",
                  display: "inline-block",
                }}
              >
                {medicalInfo.diagnosis &&
                  medicalInfo.diagnosis.length > 0 &&
                  medicalInfo.diagnosis.map((item, index) => (
                    <div key={index}>{item.disease_name}</div>
                  ))}
              </Box>
            </Box>
            <Box sx={{ margin: 1, height: "33%" }}>
              처방
              <Box sx={{ border: 1, borderRadius: 1, height: "100px" }}>
                {medicalInfo.prescription &&
                  medicalInfo.prescription.length > 0 &&
                  medicalInfo.prescription.map((item, index) => (
                    <div key={index}>{item.drug_name}</div>
                  ))}
              </Box>
            </Box>
            <Box sx={{ margin: 1, height: "33%" }}>
              증상
              <Box sx={{ border: 1, borderRadius: 1, height: "100px" }}>
                {medicalInfo.symptom}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MedicalInfo;
