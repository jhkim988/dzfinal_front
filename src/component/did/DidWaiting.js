import { Box, Grid, OutlinedInput, Paper, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import React, { useState } from "react";





const DidView = ({ initPanel, data }) => {
  function MyFormHelperText() {
    // const { focused } = useFormControl() || {};
    // const helperText = React.useMemo(() => {
    //   if (focused) {
    //     return 'This field is being focused';
    //   }
    //   return 'Helper text';
    // }, [focused]);
    // return <FormHelperText>{helperText}</FormHelperText>;
  }

//   const [value, setValue] = useState();

//   const tabInfo = [
//     { label: "내원", value: "1", filter: (data) => data.state !== "수납완료" },
//     { label: "진료", value: "2", filter: (data) => data.state === "진료대기" || data.state === "진료중" },
//     { label: "수납", value: "3", filter: (data) => data.state === "수납대기" || data.state === "수납중" },
//     { label: "완료", value: "4", filter: (data) => data.state === "수납완료" },
//   ];

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

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
            placeholder={`진료실 ${waitingPatients.length + index + 1} 대기자`}
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
                    진료실 1 / 담당의사: 김더존<br/>
                </Typography>
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

                {waitingPatients.map((item, index) => (
                    <FormControl
                        sx={{
                            width: "33%",
                        }}
                        key={index}
                    >
                        <OutlinedInput
                            placeholder={`진료실 ${index + 1} 대기자`}
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
                            waitingPatients.length <= 6
                                ? `외 0명`
                                : `외 ${waitingPatients.length - 6}명`
                        }
                        inputProps={{ style: { textAlign: "center" } }}
                        readOnly
                    />
                    <MyFormHelperText />
                </FormControl>

                </Box>
                    {/* <Box component="form" noValidate autoComplete="off">
                    <FormControl sx={{ width: "100%" }}>
                        <OutlinedInput
                        placeholder="진료실 1 대기자"
                        inputProps={{ style: { textAlign: "center" } }}
                        readOnly
                        />
                        <MyFormHelperText />
                    </FormControl>

                    <FormControl sx={{ width: "33%" }}>
                        <OutlinedInput
                        placeholder="진료실 1 대기자"
                        inputProps={{ style: { textAlign: "center" } }}
                        readOnly
                        />
                        <MyFormHelperText />
                    </FormControl>

                    <FormControl sx={{ width: "33%" }}>
                        <OutlinedInput
                        placeholder="진료실 1 대기자"
                        inputProps={{ style: { textAlign: "center" } }}
                        readOnly
                        />
                        <MyFormHelperText />
                    </FormControl>

                    <FormControl sx={{ width: "33%" }}>
                        <OutlinedInput
                        placeholder="진료실 1 대기자"
                        inputProps={{ style: { textAlign: "center" } }}
                        readOnly
                        />
                        <MyFormHelperText />
                    </FormControl>

                    <FormControl sx={{ width: "33%" }}>
                        <OutlinedInput
                        placeholder="진료실 1 대기자"
                        inputProps={{ style: { textAlign: "center" } }}
                        readOnly
                        />
                        <MyFormHelperText />
                    </FormControl>

                    <FormControl sx={{ width: "33%" }}>
                        <OutlinedInput
                        placeholder="진료실 1 대기자"
                        inputProps={{ style: { textAlign: "center" } }}
                        readOnly
                        />
                        <MyFormHelperText />
                    </FormControl>

                    <FormControl sx={{ width: "33%" }}>
                        <OutlinedInput
                        placeholder="외 N명"
                        inputProps={{ style: { textAlign: "center" } }}
                        readOnly
                        />
                        <MyFormHelperText />
                    </FormControl>
                    </Box> */}
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
                    진료실 2 / 담당의사: 이을지
                    <br/>
                    </Typography>

                    <Box component="form" noValidate autoComplete="off">
                    <FormControl sx={{ width: "100%" }}>
                        <OutlinedInput
                        placeholder="진료실 2 대기자"
                        inputProps={{ style: { textAlign: "center" } }}
                        readOnly
                        />
                        <MyFormHelperText />
                    </FormControl>

                    <FormControl sx={{ width: "33%" }}>
                        <OutlinedInput
                        placeholder="진료실 2 대기자"
                        inputProps={{ style: { textAlign: "center" } }}
                        readOnly
                        />
                        <MyFormHelperText />
                    </FormControl>

                    <FormControl sx={{ width: "33%" }}>
                        <OutlinedInput
                        placeholder="진료실 2 대기자"
                        inputProps={{ style: { textAlign: "center" } }}
                        readOnly
                        />
                        <MyFormHelperText />
                    </FormControl>

                    <FormControl sx={{ width: "33%" }}>
                        <OutlinedInput
                        placeholder="진료실 2 대기자"
                        inputProps={{ style: { textAlign: "center" } }}
                        readOnly
                        />
                        <MyFormHelperText />
                    </FormControl>

                    <FormControl sx={{ width: "33%" }}>
                        <OutlinedInput
                        placeholder="진료실 2 대기자"
                        inputProps={{ style: { textAlign: "center" } }}
                        readOnly
                        />
                        <MyFormHelperText />
                    </FormControl>

                    <FormControl sx={{ width: "33%" }}>
                        <OutlinedInput
                        placeholder="진료실 2 대기자"
                        inputProps={{ style: { textAlign: "center" } }}
                        readOnly
                        />
                        <MyFormHelperText />
                    </FormControl>

                    <FormControl sx={{ width: "33%" }}>
                        <OutlinedInput
                        placeholder="외 N명"
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

                    <Box component="form" noValidate autoComplete="off">
                    <FormControl sx={{ width: "100%" }}>
                        <OutlinedInput
                        placeholder="수납 대기자"
                        inputProps={{ style: { textAlign: "center" } }}
                        readOnly
                        />
                        <MyFormHelperText />
                    </FormControl>

                    <FormControl sx={{ width: "33%" }}>
                        <OutlinedInput
                        placeholder="수납 대기자"
                        inputProps={{ style: { textAlign: "center" } }}
                        readOnly
                        />
                        <MyFormHelperText />
                    </FormControl>

                    <FormControl sx={{ width: "33%" }}>
                        <OutlinedInput
                        placeholder="수납 대기자"
                        inputProps={{ style: { textAlign: "center" } }}
                        readOnly
                        />
                        <MyFormHelperText />
                    </FormControl>

                    <FormControl sx={{ width: "33%" }}>
                        <OutlinedInput
                        placeholder="수납 대기자"
                        inputProps={{ style: { textAlign: "center" } }}
                        readOnly
                        />
                        <MyFormHelperText />
                    </FormControl>

                    <FormControl sx={{ width: "33%" }}>
                        <OutlinedInput
                        placeholder="수납 대기자"
                        inputProps={{ style: { textAlign: "center" } }}
                        readOnly
                        />
                        <MyFormHelperText />
                    </FormControl>

                    <FormControl sx={{ width: "33%" }}>
                        <OutlinedInput
                        placeholder="수납 대기자"
                        inputProps={{ style: { textAlign: "center" } }}
                        readOnly
                        />
                        <MyFormHelperText />
                    </FormControl>

                    <FormControl sx={{ width: "33%" }}>
                        <OutlinedInput
                        placeholder="외 N명"
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
