import { sizing } from "@mui/system";
import { Grid, Box } from "@mui/material";
import ReservationMonth from "../component/ReservationMonth";
import ReservationWeek from "../component/ReservationWeek";

const ReservationLayout = () => {
  return (
    <Grid container spacing={2} sx={{ height: 1 }}>
      <Grid item xs={8}>
        <ReservationMonth/>
      </Grid>
      {/* <Grid item xs={8} sx={{ height: '50%', border: '1px red solid'}}> */}
        {/* <ReservationWeek/> */}
      {/* </Grid> */}
    </Grid>
  );
};

export default ReservationLayout;
