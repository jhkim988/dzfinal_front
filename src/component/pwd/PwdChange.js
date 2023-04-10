import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Box, Button, Card, CardMedia, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, TextField } from "@mui/material";
import React from "react";

const PwdChange = () => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const resetHandelr = () => {

    }

    const employee = 1;

    const onDelete = () => { };

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
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={1}>
                                    <Grid item xs={1}></Grid>
                                    <Grid item xs={10}>
                                        <FormControl sx={{ m: 1, width: "100%", margin: "10px" }} variant="outlined">
                                            <OutlinedInput
                                                id="outlined-adornment-password"
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="현재 비밀번호를 입력하세요."
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
                                                id="outlined-adornment-password"
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="변경할 비밀번호를 입력하세요."
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
                                                id="outlined-adornment-password"
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="변경할 비밀번호를 재입력하세요."
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
                                    <Button variant="contained">확인</Button>
                                    <Button variant="contained" color="error" onClick={resetHandelr}>취소</Button>
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