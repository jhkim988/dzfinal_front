import DidSubscribe from "./DidSubscribe";
import DidVideo from "./DidVideo";
import DidWaiting from "./DidWaiting";
import { Grid, Paper } from "@mui/material";

const DID = () => {
  return (
    <div>
        
        <Grid container spacing={2} sx={{ justifyContent: "center", alignItems: "center" }}>
            <Grid item xs={7}>
                <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Paper
                    elevation={3}
                    sx={{
                        height: "69vh",
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                    >
                    <DidVideo />
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Grid
                    item
                    xs={12}
                    sx={{ justifyContent: "center", alignItems: "center" }}
                    >
                    <Paper
                        elevation={3}
                        sx={{
                        height: "15vh",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "0 16px",
                        }}
                    >
                        <DidSubscribe />
                    </Paper>
                    </Grid>
                </Grid>
                </Grid>
            </Grid>

            <Grid item xs={3}>
                <Grid container spacing={1}>
                <Grid item xs={12}>
                    <DidWaiting />
                </Grid>
                </Grid>
            </Grid>
            </Grid>

    </div>
  );
};

export default DID;
