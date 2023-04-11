import { Grid } from "@mui/material";
import DidMessageSetting from "./DidMessageSetting";
import DidVideoSetting from "./DidVideoSetting";

const DidSetting = () => {
  return (
    <Grid container spacing={2} sx={{ marginTop: 2 }}>
      <Grid item xs={2}></Grid>
      <Grid item xs={4}>
        <DidMessageSetting />
      </Grid>
      <Grid item xs={4}>
        <DidVideoSetting />
      </Grid>
      <Grid item xs={2}></Grid>
    </Grid>
  );
};

export default DidSetting;
