import React from "react";
import { Box, TextField } from "@mui/material";

const Patient = (props) => {
  const { reception, patient } = props;

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
        접수번호
        <TextField
          disabled
          size="small"
          value={reception}
          sx={{ width: 100 }}
        />
        환자이름
        <TextField
          disabled
          size="small"
          value={patient.patient_name}
          sx={{ width: 120 }}
        />
        주민등록번호
        <TextField
          disabled
          size="small"
          value={patient.front_registration_number}
          sx={{ width: 100 }}
        />
        -
        <TextField
          disabled
          size="small"
          value={patient.back_registration_number}
          sx={{ width: 100 }}
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        키
        <TextField
          disabled
          size="small"
          value={patient.height}
          sx={{ width: 100 }}
        />
        체중
        <TextField
          disabled
          size="small"
          value={patient.weight}
          sx={{ width: 100 }}
        />
        BMI
        <TextField
          disabled
          size="small"
          value={patient.bmi}
          sx={{ width: 100 }}
        />
        혈압
        <TextField
          disabled
          size="small"
          value={`${patient.diastolic}/${patient.systolic}`}
          sx={{ width: 100 }}
        />
        혈당
        <TextField
          disabled
          size="small"
          value={patient.blood_sugar}
          sx={{ width: 100 }}
        />
      </Box>
    </Box>
  );
};

export default Patient;
