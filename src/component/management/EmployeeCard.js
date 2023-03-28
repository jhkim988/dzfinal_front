import { Box, Button, Card, CardMedia, Grid, Paper } from "@mui/material";
import axios from "axios";
import React from "react";

export default function EmployeeCard(props) {
  const { employee, setEmployees, employees } = props;

  const onDelete = () => {
    if (window.confirm("삭제 하시겠습니까?")) {
      axios
        .delete("/api/admin/employee", {
          params: { employ_id: employee.employ_id },
        })
        .then((response) => {
          const newEmployees = employees.filter(
            (e) => e.employ_id !== employee.employ_id
          );
          setEmployees(newEmployees);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Grid item xs={6}>
      <Paper elevation={3}>
        <Card sx={{ maxWidth: "100%", display: "flex" }}>
          <CardMedia
            component="img"
            height="220"
            sx={{ maxWidth: "180px" }}
            src={`http://localhost:8080/api/admin/getimage?real_image=${employee.real_image}`}
          />
          <Box sx={{ width: "100%", marginLeft: 2, marginRight: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <h2 style={{ color: "#757575" }}>{employee.employee_name}</h2>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="contained" sx={{ marginRight: 2 }}>
                  수정
                </Button>
                <Button variant="contained" color="error" onClick={onDelete}>
                  삭제
                </Button>
              </Box>
            </Box>
            <Box sx={{ display: "block" }}>
              <Box sx={{ marginTop: 1, marginBottom: 1 }}>
                직책 :{" "}
                {employee.role === "doctor"
                  ? "의사"
                  : employee.role === "rn"
                  ? "간호사"
                  : employee.role === "klpn"
                  ? "조무사"
                  : ""}
                <br />
                <br />
                아이디 : {employee.user_id}
                <br />
                <br />
                생년월일 : {employee.birth}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignContent: "flex-end",
                  color: "#69F0AE",
                }}
              >
                <h3>{employee.employee_email}</h3>
              </Box>
            </Box>
          </Box>
        </Card>
      </Paper>
    </Grid>
  );
}
