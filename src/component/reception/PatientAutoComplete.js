import { useState } from "react";
import { Autocomplete, TextField, Typography } from "@mui/material";
import axios from "axios";

const PatientAutoComplete = ({ patient_name, onBlur, onSelect }) => {
  const [text, setText] = useState("");
  const [comboBoxData, setComboBoxData] = useState([]);

  const onChange = (e) => {
    const searchText = e.target.value;
    setText(searchText);
    if (searchText.length < 2) return;
    axios
      .get(`/api/patient/list`, { params: { patient_name: searchText } })
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
    onSelect(e, value);
    setText(value.patient_name);
  };

  return (
    <Autocomplete
      sx={{
        width: "100%",
        "& > :not(style)": { m: 0.5 },
        "& .css-1mb7k4z-MuiInputBase-root-MuiOutlinedInput-root": {
          padding: "0",
          paddingLeft: "10px",
        },
        "& .css-mn1mr4-MuiInputBase-input-MuiOutlinedInput-input": {
          padding: "0",
        },
      }}
      freeSolo
      value={patient_name}
      onChange={onSelectCallback}
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
          onChange={onChange}
          onBlur={onBlur}
        />
      )}
    />
  );
};

export default PatientAutoComplete;
