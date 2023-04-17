import { Box, Grid, OutlinedInput, Paper, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import React from "react";
// import './styles.css';


const DidView = ({ data }) => {

    function MyFormHelperText() {}

    // (진료대기)1 진료실 호출할 사람들을 담음
    const waitingPatients = data.filter((item) => item.state === "진료대기" && item.doctor_id === 1 && item.state !== "진료중");
    const waitingPatientForms = [...Array(Math.max(5 - waitingPatients.length, 0))].map((_, index) => (
        <FormControl
            sx={{
                width: "33%",
                padding: "1px",
            }}
            key={waitingPatients.length + index}
        >
            <OutlinedInput
                placeholder={`1 진료실 대기자`}
                inputProps={{ style: { textAlign: "center" } }}
                readOnly
            />
            <MyFormHelperText />
        </FormControl>
    ));

    // (진료대기)2 진료실 호출할 사람들을 담음
    const waitingPatients2 = data.filter((item) => item.state === "진료대기" && item.doctor_id === 2 && item.state !== "진료중");
    const waitingPatientForms2 = [...Array(Math.max(5 - waitingPatients2.length, 0))].map((_, index) => (
        <FormControl
            sx={{
                width: "33%",
                padding: "1px",
            }}
            key={waitingPatients2.length + index}
        >
            <OutlinedInput
                placeholder={`2 진료실 대기자`}
                inputProps={{ style: { textAlign: "center" } }}
                readOnly
            />
            <MyFormHelperText />
        </FormControl>
    ));


    // (수납대기)수납 호출할 사람들을 담음
    const waitingReceipt = data.filter((item) => item.state === "수납대기" && item.state !== "수납중");
    const waitingReceiptForms = [...Array(Math.max(5 - waitingReceipt.length, 0))].map((_, index) => (
        <FormControl
            sx={{
                width: "33%",
                padding: "1px",
            }}
            key={waitingReceipt.length + index}
        >
            <OutlinedInput
                placeholder={`수납 대기자`}
                inputProps={{ style: { textAlign: "center" } }}
                readOnly
            />
            <MyFormHelperText />
        </FormControl>
    ));



  return (
    <div>
      <Paper elevation={3}
             sx={{ height: "99vh", 
                   display: "flex", 
                   justifyContent: "space-between", 
                   alignItems: "center",
                   backgroundColor: "#90caf9"}} >

        <Grid container spacing={1} >

            <Grid item xs={12}>
                <Paper elevation={3}
                        sx={{
                            height: "32vh",
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "0 06px",
                            margin: "0 3px",
                            alignItems: "center",
                        }}
                >
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h2" sx={{ paddingBottom: "25px"}}>
                        1 진료실  |  김더존 의사<br/>
                    </Typography>

                    <Box component="form" noValidate autoComplete="off">
                    {data.filter((item) => item.state === "진료중" && item.doctor_id === 1).length > 0 ? (
                     data.filter((item) => item.state === "진료중" && item.doctor_id === 1).map((item, index) => (
                        <FormControl
                            sx={{
                                width: "100%",
                                padding: "1px", 
                            }}
                            key={index}
                        >
                        <OutlinedInput
                            value={`${item.patient_name}(${item.front_registration_number})`}
                            inputProps={{ style: { textAlign: "center", fontSize: "30px", fontWeight: "bold" } }}
                            readOnly
                        />
                        <MyFormHelperText />
                        </FormControl>
                    ))
                    ) : (
                        <FormControl
                            sx={{
                            width: "100%",
                            padding: "1px",
                            }}
                        >
                            <OutlinedInput
                            value={"잠시만 기다려주세요"}
                            inputProps={{ style: { textAlign: "center", fontSize: "30px", fontWeight: "bold" } }}
                            readOnly
                            />
                            <MyFormHelperText />
                        </FormControl>
                    )}

                    {waitingPatients.slice(0, 5).map((item, index) => (
                        <FormControl
                            sx={{
                                width: "33%",
                                padding: "1px",
                            }}
                            key={index}
                        >
                            <OutlinedInput
                                value={`${item.patient_name}(${item.front_registration_number})`}
                                inputProps={{ style: { textAlign: "center" } }}
                                readOnly
                            />
                            <MyFormHelperText />
                        </FormControl>
                    ))}
                    {waitingPatientForms}
                    <FormControl sx={{ width: "33%", padding: "1px", }}>
                        <OutlinedInput
                            value={
                                waitingPatients.length <= 5
                                    ? `외 0명`
                                    : `외 ${waitingPatients.length - 5}명`
                            }
                            inputProps={{ style: { textAlign: "center" } }}
                            readOnly
                        />
                        <MyFormHelperText />
                    </FormControl>

                    </Box>
                </Box>
                </Paper>
            </Grid>



            <Grid item xs={12}>
                <Paper elevation={3}
                        sx={{
                            height: "32vh",
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "0 06px",
                            margin: "0 3px",
                            alignItems: "center",
                        }}
                >
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h2" sx={{ paddingBottom: "25px"}}>
                    2 진료실  |  이을지 의사
                    </Typography>

                    <Box component="form" noValidate autoComplete="off">
                    {data.filter((item) => item.state === "진료중" && item.doctor_id === 2).length > 0 ? (
                    data.filter((item) => item.state === "진료중" && item.doctor_id === 2).map((item, index) => (
                        <FormControl
                        sx={{
                            width: "100%",
                            padding: "1px",
                        }}
                        key={index}
                        >
                        <OutlinedInput
                            value={`${item.patient_name}(${item.front_registration_number})`}
                            inputProps={{ style: { textAlign: "center", fontSize: "30px", fontWeight: "bold" } }}
                            readOnly
                        />
                        <MyFormHelperText />
                        </FormControl>
                    ))
                    ) : (
                        <FormControl
                            sx={{
                            width: "100%",
                            padding: "1px",
                            }}
                        >
                            <OutlinedInput
                            value={"잠시만 기다려주세요"}
                            inputProps={{ style: { textAlign: "center", fontSize: "30px", fontWeight: "bold" } }}
                            readOnly
                            />
                            <MyFormHelperText />
                        </FormControl>
                    )}

                    {waitingPatients2.slice(0, 5).map((item, index) => (
                        <FormControl
                            sx={{
                                width: "33%",
                                padding: "1px",
                            }}
                            key={index}
                        >
                            <OutlinedInput
                                value={`${item.patient_name}(${item.front_registration_number})`}
                                inputProps={{ style: { textAlign: "center" } }}
                                readOnly
                            />
                            <MyFormHelperText />
                        </FormControl>
                    ))}
                    {waitingPatientForms2}
                    <FormControl sx={{ width: "33%", padding: "1px", }}>
                        <OutlinedInput
                            value={
                                waitingPatients2.length <= 5
                                    ? `외 0명`
                                    : `외 ${waitingPatients2.length - 5}명`
                            }
                            inputProps={{ style: { textAlign: "center" } }}
                            readOnly
                        />
                        <MyFormHelperText />
                    </FormControl>

                    </Box>
                </Box>
                </Paper>
            </Grid>



            <Grid item xs={12}>
                <Paper elevation={3}
                        sx={{
                            height: "32vh",
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "0 06px",
                            margin: "0 3px",
                            alignItems: "center",
                        }}
                >
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h2" sx={{ paddingBottom: "25px"}}>
                    수납
                    </Typography>

                    <Box component="form" noValidate autoComplete="off">
                    {data.filter((item) => item.state === "수납중").length > 0 ? (
                    data.filter((item) => item.state === "수납중").map((item, index) => (
                        <FormControl
                            sx={{
                                width: "100%",
                                padding: "1px",
                            }}
                            key={index}
                        >
                        <OutlinedInput
                            value={`${item.patient_name}(${item.front_registration_number})`}
                            inputProps={{ style: { textAlign: "center", fontSize: "30px", fontWeight: "bold" } }}
                            readOnly
                        />
                        <MyFormHelperText />
                        </FormControl>
                    ))
                    ) : (
                    <FormControl
                        sx={{
                        width: "100%",
                        padding: "1px",
                        }}
                    >
                        <OutlinedInput
                        value={"잠시만 기다려주세요"}
                        inputProps={{ style: { textAlign: "center", fontSize: "30px", fontWeight: "bold" }}}
                        readOnly
                        />
                        <MyFormHelperText />
                    </FormControl>
                    )}
                    
                    {waitingReceipt.slice(0, 5).map((item, index) => (
                        <FormControl
                            sx={{
                            width: "33%",
                            padding: "1px",
                            }}
                            key={index}
                        >
                            <OutlinedInput
                            value={`${item.patient_name}(${item.front_registration_number})`}
                            inputProps={{ style: { textAlign: "center" } }}
                            readOnly
                            />
                            <MyFormHelperText />
                        </FormControl>
                    ))}

                    {waitingReceiptForms}
                    <FormControl sx={{ width: "33%", padding: "1px", }}>
                        <OutlinedInput
                            value={
                                waitingReceipt.length <= 5
                                    ? `외 0명`
                                    : `외 ${waitingReceipt.length - 5}명`
                            }
                            inputProps={{ style: { textAlign: "center" } }}
                            readOnly
                        />
                        <MyFormHelperText />
                    </FormControl>

                    </Box>
                    
                </Box>
                </Paper>
            </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default DidView;
