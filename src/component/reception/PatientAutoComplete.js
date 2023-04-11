import { useState } from "react";
import { Autocomplete, TextField, Typography } from "@mui/material";
import axios from "axios";
import axiosClient from "../login/AxiosClient";

const PatientAutoComplete = ({ patient_name, onSelect, onInputChange, variant }) => {
  const [text, setText] = useState("");
  const [comboBoxData, setComboBoxData] = useState([]);

  const autoCompleteRequest = (e, value) => {
    setText(value);
    if (value.length < 2) return;
    axiosClient
      .get(`/api/patient/list`, { params: { patient_name: value } })
      .then(({ data }) => {
        const formattedData = data.map((el) => ({
          ...el,
          label: el.patient_name,
          value: el.patient_id,
        }));
        setComboBoxData(formattedData);
      });
  };

  const onSelectCallback = (e, value) => {
    value && onSelect(e, value);
    setText(value?.patient_name);
  };

  return (
    <Autocomplete
      sx={{
        width: "100%",
        "& > :not(style)": { marginLeft: 0.5 },
        "& .css-1mb7k4z-MuiInputBase-root-MuiOutlinedInput-root": {
          padding: "0",
          paddingLeft: "10px",
        },
        "& .css-mn1mr4-MuiInputBase-input-MuiOutlinedInput-input": {
          padding: "0",
        },
      }}
      freeSolo
      value={patient_name || ""}
      onChange={onSelectCallback}
      onInputChange={(e, value, reason) => {
        if (reason === "input") {
          autoCompleteRequest(e, value);
        }
        onInputChange(e, value, reason);
      }}
      disablePortal
      options={comboBoxData}
      renderOption={(props, option) => (
        <Typography {...props}>
          {option.patient_name} {option.front_registration_number}{" "}
          {option.phone_number3}
        </Typography>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          value={text}
          label="환자이름 검색"
          InputLabelProps={{
            shrink: true,
          }}
          variant={variant || "outlined"}
        />
      )}
    />
  );
};

export default PatientAutoComplete;
