import React from "react";
import { useCallback } from "react";
import { Paper } from "@mui/material";
import { Scheduler, DayView, Appointments } from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState } from "@devexpress/dx-react-scheduler";

const ReservationDay = ({ reservationModel, reservationController, setReservationFormData }) => {
  const clickEmptyCell = useCallback((e) => {
    const dateObj = new Date(e.currentTarget.dataset.datetime);
    const date = dateObj.toISOString().slice(0, 10);
    const time = `${dateObj.getHours().toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })}:${dateObj.getMinutes().toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })}`;
    reservationController.setReservationFormModal(true);
    setReservationFormData(prev => ({ ...prev, date_time: `${date} ${time}`, date, time }));
  }, []);
  
  return (
    <Paper sx={{ height: 1 }}>
      <Scheduler data={reservationModel.daySchedule}>
        <ViewState currentDate={reservationModel.viewDate} />
        <DayView
          startDayHour={9}
          endDayHour={18}
          cellDuration={20}
          timeTableCellComponent={(props) => <DayView.TimeTableCell {...props} data-datetime={props.startDate} style={{ height: 30 }} onClick={clickEmptyCell}/>}
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

export default React.memo(ReservationDay);
