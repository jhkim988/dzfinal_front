import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableRow,
  TextField,
} from "@mui/material";
import React from "react";
import { useState } from "react";

const Register = () => {
  const [role, setRole] = useState("");

  const handleChange = (e) => {
    setRole(e.target.value);
  };

  const [file, setFile] = useState(null);

  const handleBoxClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs></Grid>
      <Grid item xs={6}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <h1>사용자 등록</h1>
        </Box>
        <Grid container spacing={2} sx={{ marginTop: 5 }}>
          <Grid item xs={6}>
            <Box
              sx={{
                border: "1px solid #ccc",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                cursor: "pointer",
              }}
              onClick={handleBoxClick}
            >
              {file ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt="Uploaded file"
                  width="100%"
                />
              ) : (
                ""
              )}
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Table
              sx={{
                [`& .${tableCellClasses.root}`]: {
                  borderBottom: "none",
                },
              }}
            >
              <TableBody>
                <TableRow>
                  <TableCell>
                    <TextField
                      label="아이디"
                      variant="outlined"
                      sx={{ width: "100%" }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <TextField
                      label="이메일"
                      variant="outlined"
                      sx={{ width: "100%" }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <TextField
                      label="이름"
                      variant="outlined"
                      sx={{ width: "100%" }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <FormControl fullWidth>
                      <InputLabel>직책</InputLabel>
                      <Select value={role} label="role" onChange={handleChange}>
                        <MenuItem value={"doctor"}>의사</MenuItem>
                        <MenuItem value={"nurse"}>간호사</MenuItem>
                        <MenuItem value={"assistant"}>조무사</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <TextField
                      label="생년월일"
                      variant="outlined"
                      sx={{ width: "100%" }}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                marginTop: 2,
              }}
            >
              <Button variant="contained">등록</Button>
              <Button variant="contained" color="error">
                취소
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs></Grid>
    </Grid>
  );
};

export default Register;
