import { Box, Grid, OutlinedInput, Paper, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import React from "react";





const DidView = ({ data }) => {
  function MyFormHelperText() {

  }

// 진료실1 호출할 사람들을 담음
const waitingPatients = data.filter((item) => item.state === "진료대기" && item.doctor_id === 1 && item.state !== "진료중");
const waitingPatientForms = [...Array(Math.max(5 - waitingPatients.length, 0))].map((_, index) => (
    <FormControl
        sx={{
            width: "33%",
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

// 진료실2 호출할 사람들을 담음
const waitingPatients2 = data.filter((item) => item.state === "진료대기" && item.doctor_id === 2 && item.state !== "진료중");
const waitingPatientForms2 = [...Array(Math.max(5 - waitingPatients2.length, 0))].map((_, index) => (
    <FormControl
        sx={{
            width: "33%",
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


// 수납 호출할 사람들을 담음
const waitingReceipt = data.filter((item) => item.state === "수납대기" && item.state !== "수납중");
const waitingReceiptForms = [...Array(Math.max(5 - waitingReceipt.length, 0))].map((_, index) => (
    <FormControl
        sx={{
            width: "33%",
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
                            padding: "0 16px",
                            margin: "0 8px",
                            alignItems: "center",
                        }}
                >
                <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h2">
                    1 진료실  |  담당의사: 김더존<br/>
                </Typography>
                { }

                <Box component="form" noValidate autoComplete="off">
                {data.filter((item) => item.state === "진료중" && item.doctor_id === 1).length > 0 ? (
                data.filter((item) => item.state === "진료중" && item.doctor_id === 1).map((item, index) => (
                    <FormControl
                    sx={{
                        width: "100%",
                    }}
                    key={index}
                    >
                    <OutlinedInput
                        placeholder={`진료중 ${index + 1}`}
                        value={`${item.patient_name}(${item.front_registration_number})`}
                        inputProps={{ style: { textAlign: "center" } }}
                        readOnly
                    />
                    <MyFormHelperText />
                    </FormControl>
                ))
                ) : (
                <FormControl
                    sx={{
                    width: "100%",
                    }}
                >
                    <OutlinedInput
                    placeholder={`진료중`}
                    value={"잠시만 기다려주세용 ^*^"}
                    inputProps={{ style: { textAlign: "center" } }}
                    readOnly
                    />
                    <MyFormHelperText />
                </FormControl>
                )}

                {waitingPatients.slice(0, 5).map((item, index) => (
                    <FormControl
                        sx={{
                            width: "33%",
                        }}
                        key={index}
                    >
                        <OutlinedInput
                            placeholder={"1 진료실 대기자"}
                            value={`${item.patient_name}(${item.front_registration_number})`}
                            inputProps={{ style: { textAlign: "center" } }}
                            readOnly
                        />
                        <MyFormHelperText />
                    </FormControl>
                ))}
                {waitingPatientForms}
                <FormControl sx={{ width: "33%" }}>
                    <OutlinedInput
                        placeholder={
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
                            padding: "0 16px",
                            margin: "0 8px",
                            alignItems: "center",
                        }}
                >
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h2">
                    2 진료실  |  담당의사: 이을지
                    </Typography>
                    { }

                    <Box component="form" noValidate autoComplete="off">
                    {data.filter((item) => item.state === "진료중" && item.doctor_id === 2).length > 0 ? (
                    data.filter((item) => item.state === "진료중" && item.doctor_id === 2).map((item, index) => (
                        <FormControl
                        sx={{
                            width: "100%",
                        }}
                        key={index}
                        >
                        <OutlinedInput
                            placeholder={`진료중 ${index + 1}`}
                            value={`${item.patient_name}(${item.front_registration_number})`}
                            inputProps={{ style: { textAlign: "center" } }}
                            readOnly
                        />
                        <MyFormHelperText />
                        </FormControl>
                    ))
                    ) : (
                    <FormControl
                        sx={{
                        width: "100%",
                        }}
                    >
                        <OutlinedInput
                        placeholder={`진료중`}
                        value={"잠시만 기다려주세용 ^*^"}
                        inputProps={{ style: { textAlign: "center" } }}
                        readOnly
                        />
                        <MyFormHelperText />
                    </FormControl>
                    )}

                    {waitingPatients2.slice(0, 5).map((item, index) => (
                        <FormControl
                            sx={{
                                width: "33%",
                            }}
                            key={index}
                        >
                            <OutlinedInput
                                placeholder={"1 진료실 대기자"}
                                value={`${item.patient_name}(${item.front_registration_number})`}
                                inputProps={{ style: { textAlign: "center" } }}
                                readOnly
                            />
                            <MyFormHelperText />
                        </FormControl>
                    ))}
                    {waitingPatientForms2}
                    <FormControl sx={{ width: "33%" }}>
                        <OutlinedInput
                            placeholder={
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
                            padding: "0 16px",
                            margin: "0 8px",
                            alignItems: "center",
                        }}
                >
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h2">
                    수납
                    <br/>
                    </Typography>
                    { }

                        {/* 수납대기: {waitingReceipt.length} 명 */}
                    <Box component="form" noValidate autoComplete="off">
                    {data.filter((item) => item.state === "수납중").length > 0 ? (
                    data.filter((item) => item.state === "수납중").map((item, index) => (
                        <FormControl
                        sx={{
                            width: "100%",
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
                    ))
                    ) : (
                    <FormControl
                        sx={{
                        width: "100%",
                        }}
                    >
                        <OutlinedInput
                        placeholder={`진료중`}
                        value={"잠시만 기다려주세용 ^*^"}
                        inputProps={{ style: { textAlign: "center" } }}
                        readOnly
                        />
                        <MyFormHelperText />
                    </FormControl>
                    )}
                    {waitingReceipt.slice(0, 5).map((item, index) => (
                        <FormControl
                            sx={{
                            width: "33%",
                            }}
                            key={index}
                        >
                            <OutlinedInput
                            placeholder={"1 진료실 대기자"}
                            value={`${item.patient_name}(${item.front_registration_number})`}
                            inputProps={{ style: { textAlign: "center" } }}
                            readOnly
                            />
                            <MyFormHelperText />
                        </FormControl>
                    ))}

                    {waitingReceiptForms}
                    <FormControl sx={{ width: "33%" }}>
                        <OutlinedInput
                            placeholder={
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
