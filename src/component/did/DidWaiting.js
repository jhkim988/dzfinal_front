import { Box, Grid, OutlinedInput, Paper, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import React from "react";

const DidView = ({data}) => {
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

  return (
    <div>
      <Paper elevation={3}
             sx={{ height: "85vh", 
                   display: "flex", 
                   justifyContent: "space-between", 
                   alignItems: "center",
                   backgroundColor: "#90caf9"}} >

        <Grid container spacing={1} >

            <Grid item xs={12}>
                <Paper elevation={3}
                        sx={{
                            height: "27vh",
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
                    data: {data.reception_id}
                    </Typography>

                    <Box component="form" noValidate autoComplete="off">
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
                    </Box>
                </Box>
                </Paper>
            </Grid>



            <Grid item xs={12}>
                <Paper elevation={3}
                        sx={{
                            height: "27vh",
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
                            height: "27vh",
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
