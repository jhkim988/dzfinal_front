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
import { BorderBottom } from "@material-ui/icons";

function createData(name, unit) {
  return { name, unit };
}

const rows = [
  createData("진료날짜"),
  createData("담당의"),
  createData("혈압"),
  createData("혈당"),
  createData("키", "cm"),
  createData("체중", "kg"),
  createData("BMI"),
  createData("내원사유"),
];

const MedicalInfo = () => {
  return (
    <Paper>
      <Grid container>
        <Grid item xs={12}>
          <Box>내원기록 상세보기</Box>
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "end" }}>
          <Button variant="contained" color="success" sx={{ marginRight: 2 }}>
            복사
          </Button>
          <Button variant="contained" sx={{ marginRight: 2 }}>
            수정하기
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
                    <TextField variant="outlined" size="small" />
                    {row.unit}
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
              <Box sx={{ border: 1, borderRadius: 1, height: "100px" }}>
                asdfasdfsaf
              </Box>
            </Box>
            <Box sx={{ margin: 1, height: "33%" }}>
              처방
              <Box sx={{ border: 1, borderRadius: 1, height: "100px" }}>
                asdfasdfsaf
              </Box>
            </Box>
            <Box sx={{ margin: 1, height: "33%" }}>
              증상
              <Box sx={{ border: 1, borderRadius: 1, height: "100px" }}>
                asdfasdfsaf
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MedicalInfo;
