import { Box, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useState } from "react";
import EmployeeCard from "./EmployeeCard";
import axiosClient from './../login/AxiosClient';

const Management = () => {
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    axiosClient
      .get("/api/admin/employee")
      .then((response) => {
        setEmployees(response.data);
      })
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs></Grid>
      <Grid item xs={8}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <h1>사용자 관리</h1>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button variant="contained" color="success" sx={{ color: "white" }}>
              <Link
                to="/register"
                style={{ color: "white", textDecoration: "none" }}
              >
                등록
              </Link>
            </Button>
          </Box>
        </Box>
        <Grid container spacing={2} sx={{ marginTop: 3 }}>
          {employees.map((employee) => (
            <EmployeeCard
              key={employee.employ_id}
              employee={employee}
              setEmployees={setEmployees}
              employees={employees}
            />
          ))}
        </Grid>
      </Grid>
      <Grid item xs></Grid>
    </Grid>
  );
};

export default Management;
