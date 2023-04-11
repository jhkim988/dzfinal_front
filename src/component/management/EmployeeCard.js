import { Box, Button, Card, CardMedia, Grid, Paper } from "@mui/material";
import React from "react";
import axiosClient from "../login/AxiosClient";
import { Link, useNavigate } from 'react-router-dom';

export default function EmployeeCard(props) {
  const navigate = useNavigate();
  const { employee, setEmployees, employees } = props;
  const onDelete = () => {
    if (window.confirm("삭제 하시겠습니까?")) {
      axiosClient
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
                {/* <Link to={{
                  pathname: `/employee_update_form`,
                  state: { employ_id : employee.employ_id }
                }}> */}
                  <Button variant="contained" sx={{ marginRight: 2 }} onClick={() => navigate(`/employee_update_form`, {state: { employ_id : employee.employ_id }})}>
                    수정
                  </Button>
                {/* </Link> */}
                <Button variant="contained" color="error" onClick={onDelete}>
                  삭제
                </Button>
              </Box>
            </Box>
            <Box sx={{ display: "block" }}>
              <Box sx={{ marginTop: 1, marginBottom: 1 }}>
                직책 :{" "}
                {employee.role}
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
