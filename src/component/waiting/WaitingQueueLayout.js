import { Grid } from "@mui/material";
import CallButtonSet from './CallButtonSet';
import WaitingQueue from './WaitingQueue';

const WaitingQueueLayout = () => {
  return <Grid container>
    <Grid item xs={12}>
      <CallButtonSet/>
    </Grid>
    <Grid item xs={12}>
        <WaitingQueue/>
    </Grid>
  </Grid>;
};

export default WaitingQueueLayout;
