import React from 'react';
import { Paper, Grid, Typography, Box, FormControl, OutlinedInput, InputLabel} from '@mui/material';

const Receipt = ({ data }) => {

    function MyFormHelperText() {}

    // (수납대기)수납 호출할 사람들을 담음
    const waitingReceipt = data.filter((item) => item.state === "수납대기" && item.state !== "수납중");

    return (
        <div>
            <Paper 
                  elevation={3} 
                  sx={{ 
                    height: "99vh",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "#90caf9",
                    }}
                >
            
                <Grid container spacing={1}>
                    
                <Grid item xs={12}>
                        <Paper elevation={3}
                               sx={{
                                height: "35vh",
                                display: "flex",
                                justifyContent: "space-between",
                                padding: "0 16px",
                                margin: "0 8px",
                                alignItems: "center",
                               }}>
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography style={{ fontSize: "14.5px" , fontWeight: "bold", color: "white" }} sx={ {paddingRight:"28%", paddingLeft:"30%", paddingBottom: "10px"}}>
                                담당자 김윤지
                                </Typography>
                                <Typography style={{fontSize: "5rem" , fontWeight: "bold"}} sx={{ paddingRight:"25%", paddingLeft:"35%", }}>
                                수납
                                </Typography>
                                <br/>
                                <Typography style={{ fontSize: "14.5px" , fontWeight: "bold", color: "white" }} sx={ {paddingRight:"28%", paddingLeft:"30%", paddingBottom: "10px"}}>
                                담당자 김윤지
                                </Typography>

                                <Box component="form" noValidate autoComplete="off">
                                {data.filter((item) => item.state === "수납중").length > 0 ? (
                                data.filter((item) => item.state === "수납중").map((item, index) => (
                                    <FormControl
                                    sx={{
                                        width: "100%",
                                        padding: "2.5px",
                                    }}
                                    key={index}
                                    >
                                    <OutlinedInput
                                        value={`${item.patient_name}(${item.front_registration_number})`}
                                        inputProps={{ style: { textAlign: "center", fontSize: "50px", fontWeight: "bold" } }}
                                        readOnly
                                    />
                                    <MyFormHelperText />
                                    </FormControl>
                                ))
                                ) : (
                                    <FormControl
                                        sx={{
                                        width: "100%",
                                        padding: "2.5px",
                                        }}
                                    >
                                        <OutlinedInput
                                        value={"잠시만 기다려주세요"}
                                        inputProps={{ style: { height:"80px", textAlign: "center", fontSize: "50px", fontWeight: "bold" } }}
                                        readOnly
                                        />
                                        <MyFormHelperText />
                                    </FormControl>
                                )}
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>


                    <Grid item xs={12}>
                        <Paper
                            elevation={3}
                            sx={{
                            height: "17vh",
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "0 16px",
                            margin: "0 8px",
                            alignItems: "center",
                            }}
                        >
                            <Grid item xs={4}>
                                <Typography  style={{fontSize: "35px", fontWeight: "bold", }} sx={{ paddingLeft: "20%", }}>
                                    대기인원:
                                </Typography>
                            </Grid>

                            <Grid item xs={8}>
                                <FormControl sx={{ width: "100%", padding: "2.5px", }}>
                                    <InputLabel
                                    htmlFor="waiting-patients"
                                    shrink={false}
                                    style={{ color:"black", fontSize: "40px", fontWeight: "bold", textAlign: "center", paddingTop: "10px", }}
                                    sx={{ paddingLeft: "40%" }}
                                    >
                                    {`${waitingReceipt.length} 명`}
                                    </InputLabel>
                                    <OutlinedInput
                                    id="waiting-patients"
                                    readOnly
                                    inputProps={{
                                        style: {
                                        height: "80px",
                                        textAlign: "center",
                                        },
                                    }}
                                    />
                                    <MyFormHelperText />
                                </FormControl>
                            </Grid>
                        </Paper>
                    </Grid>



                    <Grid item xs={12}>
                        <Paper elevation={3}
                               sx={{
                                height: "43vh",
                                display: "flex",
                                justifyContent: "space-between",
                                padding: "0 16px",
                                margin: "0 8px",
                                alignItems: "center",
                               }}>
                            
                            <Grid item xs={6}>
                            {[...Array(4)].map((_, index) => {
                                const item = waitingReceipt[index];
                                return (
                                    <FormControl
                                        sx={{
                                            width: "100%",
                                            padding: "2.5px",
                                        }}
                                        key={index}
                                    >
                                        {item ? (
                                            <OutlinedInput
                                                value={`${item.patient_name}(${item.front_registration_number})` || ''}
                                                inputProps={{ style: { height: "60px", textAlign: "center", fontSize: "30px", fontWeight: "bold", } }}
                                                readOnly
                                            />
                                        ) : (
                                            <OutlinedInput
                                                value={""}
                                                inputProps={{ style: { color: "#bdbdbd", height: "60px", textAlign: "center", fontSize: "30px", fontWeight: "bold", } }}
                                                readOnly
                                            />
                                        )}
                                        <MyFormHelperText />
                                    </FormControl>
                                );
                            })}
                            </Grid>

                            
                            <Grid item xs={6}>
                            {[...Array(4)].map((_, index) => {
                                const item = waitingReceipt[index+4];
                                return (
                                    <FormControl
                                        sx={{
                                            width: "100%",
                                            padding: "2.5px",
                                        }}
                                        key={index}
                                    >
                                        {item ? (
                                            <OutlinedInput
                                                value={`${item.patient_name}(${item.front_registration_number})` || ''}
                                                inputProps={{ style: { height: "60px", textAlign: "center", fontSize: "30px", fontWeight: "bold", } }}
                                                readOnly
                                            />
                                        ) : (
                                            <OutlinedInput
                                                value={""}
                                                inputProps={{ style: { color: "#bdbdbd", height: "60px", textAlign: "center", fontSize: "30px", fontWeight: "bold", } }}
                                                readOnly
                                            />
                                        )}
                                        <MyFormHelperText />
                                    </FormControl>
                                );
                            })}
                            </Grid>

                        </Paper>
                    </Grid>

                </Grid>

            </Paper>
        </div>
    );
};

export default Receipt;