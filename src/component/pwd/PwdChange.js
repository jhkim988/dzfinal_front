import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Box, Button, Card, CardMedia, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, TextField } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import axiosClient from './../login/AxiosClient';
import { useState } from "react";
import axios from "axios";

const PwdChange = () => {
    const init = {
        currentPwd: "",
        newPwd: "",
        checkPwd: ""
    }
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const [input, setInput] = useState(init);
    const [employeeInfo, setEmployeeInfo] = useState({});

    const auth = JSON.parse(localStorage.getItem("auth"));
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    // const employ_id = userInfo.employ_id;
    // console.log(auth);
    // console.log(atob(auth.access_token.split('.')[1]));
    // console.log(userInfo);
    console.log(input);

    useEffect(() => {
        axiosClient.get(`/api/employee/by_token`)
            .then((response) => {
                console.log(response.data);
                setEmployeeInfo(response.data);
            })
    }, []);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const onChange = (event) => {
        console.log(event.target.name, event.target.value);
        setInput((prev) => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    const resetHandelr = () => {
        setInput(init);
    }

    const onSubmit = () => {
        axios.put(`http://localhost:8081/changePwd/${employeeInfo.user_id}`, input)
            .then((response) => {
                alert("성공");

            }).catch(error => {
                alert("실패");
            })
    }
    return (
        <>
            <Grid container={1}>
                <Grid item xs={4}>

                </Grid>
                <Grid item xs={4}>
                    <Paper elevation={2} sx={{ height: "82vh" }}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <h3 style={{ marginTop: "10px", marginBottom: "10px" }}>
                                    비밀번호 변경
                                </h3>
                            </Grid>
                            <Grid item xs={12}>
                                <Card sx={{ maxWidth: "100%", display: "flex", background: "#F6F6F6" }} elevation={1}>
                                    <CardMedia
                                        component="img"
                                        height="220"
                                        sx={{ maxWidth: "180px" }}
                                        src={`/api/admin/getimage?real_image=${userInfo.real_image}`}
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
                                                <h2 style={{ color: "#757575" }}>{userInfo.employee_name}</h2>
                                            </Box>
                                        </Box>
                                        <Box sx={{ display: "block" }}>
                                            <Box sx={{ marginTop: 1, marginBottom: 1 }}>
                                                직책 :{userInfo.authority}
                                                <br />
                                                <br />
                                                아이디 : {auth.user_id}
                                                <br />
                                                <br />
                                                생년월일 : {employeeInfo.birth}
                                                <br />
                                                <br />
                                                이메일 : {employeeInfo.employee_email}
                                            </Box>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "flex-end",
                                                    alignContent: "flex-end",
                                                    color: "#69F0AE",
                                                }}
                                            >
                                                {/* <h3>{employeeInfo.employee_email}</h3> */}
                                            </Box>
                                        </Box>
                                    </Box>
                                </Card>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={1}>
                                    <Grid item xs={1}></Grid>
                                    <Grid item xs={10}>
                                        <FormControl sx={{ m: 1, width: "100%", margin: "10px" }} variant="outlined">
                                            <OutlinedInput
                                                name="currentPwd"
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="현재 비밀번호를 입력하세요."
                                                onChange={onChange}
                                                value={input.currentPwd || ""}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={1}></Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={1}>
                                    <Grid item xs={1}></Grid>
                                    <Grid item xs={10}>
                                        <FormControl sx={{ m: 1, width: "100%", margin: "10px" }} variant="outlined">
                                            <OutlinedInput
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="변경할 비밀번호를 입력하세요."
                                                name="newPwd"
                                                value={input.newPwd || ""}
                                                onChange={onChange}

                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={1}></Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={1}>
                                    <Grid item xs={1}></Grid>
                                    <Grid item xs={10}>
                                        <FormControl sx={{ m: 1, width: "100%", margin: "10px" }} variant="outlined">
                                            <OutlinedInput
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="변경할 비밀번호를 재입력하세요."
                                                name="checkPwd"
                                                value={input.checkPwd || ""}
                                                onChange={onChange}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={1}></Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Button variant="contained" onClick={onSubmit} style={{ width: "100px", marginLeft: "10px" }}>확인</Button>
                                    <Button variant="contained" color="error" onClick={resetHandelr} style={{ width: "100px", marginRight: "10px" }}>취소</Button>
                                </Box>

                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={4}>

                </Grid>
            </Grid>
        </>
    )
};

export default PwdChange;