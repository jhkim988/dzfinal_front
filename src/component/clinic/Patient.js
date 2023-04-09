import React from "react";
import { Box, InputAdornment, TextField, Typography } from "@mui/material";

const Patient = (props) => {
  const { reception, patient } = props;

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ marginLeft: 2 }}>
        접수정보
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", m: 1 }}>
        <TextField
          disabled
          size="small"
          value={reception || ""}
          label="접수번호"
          sx={{ marginLeft: 1, marginRight: 1 }}
        />
        <TextField
          disabled
          size="small"
          value={patient.patient_name || ""}
          label="환자이름"
          sx={{ marginLeft: 1, marginRight: 1 }}
        />
        <TextField
          disabled
          size="small"
          value={patient.treatment_reason || ""}
          label="내원사유"
          sx={{ marginLeft: 1, marginRight: 1, width: "100%" }}
        />
        {/* <TextField
          disabled
          size="small"
          value={patient.front_registration_number || ""}
          label="앞자리"
          sx={{ marginLeft: 1, marginRight: 1 }}
        />
        -
        <TextField
          disabled
          size="small"
          value={patient.back_registration_number || ""}
          label="뒷자리"
          sx={{ marginLeft: 1, marginRight: 1 }}
        /> */}
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", m: 1 }}>
        <TextField
          disabled
          size="small"
          value={patient.height || ""}
          label="키"
          InputProps={{
            endAdornment: <InputAdornment position="end">cm</InputAdornment>,
          }}
          sx={{ marginLeft: 1, marginRight: 1 }}
        />
        <TextField
          disabled
          size="small"
          value={patient.weight || ""}
          label="체중"
          InputProps={{
            endAdornment: <InputAdornment position="end">kg</InputAdornment>,
          }}
          sx={{ marginLeft: 1, marginRight: 1 }}
        />
        <TextField
          disabled
          size="small"
          value={patient.bmi || ""}
          label="BMI"
          InputProps={{
            endAdornment: <InputAdornment position="end">kg/㎡</InputAdornment>,
          }}
          sx={{ marginLeft: 1, marginRight: 1, width: "260px" }}
        />
        <TextField
          disabled
          size="small"
          value={`${patient.diastolic ?? ""}/${patient.systolic ?? ""}`}
          label="혈압"
          InputProps={{
            endAdornment: <InputAdornment position="end">mmHg</InputAdornment>,
          }}
          sx={{ marginLeft: 1, marginRight: 1, width: "300px" }}
        />
        <TextField
          disabled
          size="small"
          value={patient.blood_sugar || ""}
          label="혈당"
          InputProps={{
            endAdornment: <InputAdornment position="end">mg/dL</InputAdornment>,
          }}
          sx={{ marginLeft: 1, marginRight: 1 }}
        />
      </Box>
    </Box>
  );
};

export default Patient;
