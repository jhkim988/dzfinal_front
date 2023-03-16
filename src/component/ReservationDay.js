import { Paper } from "@mui/material";
import { Scheduler, DayView, Appointments } from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState } from "@devexpress/dx-react-scheduler";

const ReservationDay = ({ reservationModel, reservationController }) => {
  return (
    <Paper sx={{ height: 1 }}>
      <Scheduler data={reservationModel.daySchedule}>
        <ViewState currentDate={reservationModel.viewDate} />
        <DayView
          startDayHour={9}
          endDayHour={18}
          cellDuration={20}
          timeTableCellComponent={(props) => <DayView.TimeTableCell {...props} style={{ height: 30 }}/>}
          timeTableLayoutComponent={(props) => <DayView.TimeTableLayout {...props} style={{ height: 800 }}/>}
          timeScaleLabelComponent={(props) => {
            if (!props.time) return <DayView.TimeScaleLabel {...props} style={{ height: 15 }}/>
            else return <DayView.TimeScaleLabel {...props} style={{ height: 30 }}/>
          }}
          timeScaleTickCellComponent={(props) => <DayView.TimeScaleTickCell style={{ height: 30 }}/>}
        />
        <Appointments style={{height: '100%'}}/>
      </Scheduler>
    </Paper>
  );
};

export default ReservationDay;
