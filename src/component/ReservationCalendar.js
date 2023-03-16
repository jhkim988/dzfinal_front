import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { Paper, Button } from "@mui/material";
import { styled } from '@mui/material/styles';
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  MonthView,
  WeekView,
  Appointments,
  Toolbar,
  ViewSwitcher,
} from "@devexpress/dx-react-scheduler-material-ui";
import axios from 'axios';

const appointmentBackground = {
  doctor1: '#F29D94',
  doctor2: '#BEDEF3',
}

const StyledMonthViewTimeTableCell = styled(MonthView.TimeTableCell)(({ theme }) => ({
  [`&.prevDays`]: {
    backgroundColor: '#E8E8E8',
    opacity: 0.5,
    height: 125,
  },
  [`&.nextDays`]: {
    backgroundColor: 'white',
    height: 125,
  },
  [`&.day${0}`]: {
    color: 'red'
  },
  [`&.day${6}`]: {
    color: 'blue'
  }
}));

const compareDate = (date1, date2) => {
  if (date1.getYear() !== date2.getYear()) return date1.getYear() - date2.getYear();
  if (date1.getMonth() !== date2.getMonth()) return date1.getMonth() - date2.getMonth();
  return date1.getDate() - date2.getDate();
}

const Appointment = ({children, style, ...restProps}) => {
  return <Appointments.Appointment {...restProps} style={{...style, backgroundColor: appointmentBackground[restProps.data.doctor] || 'blue', borderRadius: '8px'}}>
    {children}
  </Appointments.Appointment>
}

const ReservationCalendar = ({ reservationModel, reservationController }) => {

  const MonthCell = useCallback((props) => {
    const { startDate } = props;
    const date = new Date(startDate.getTime() - startDate.getTimezoneOffset()*60_000);
    const dateString = date.toISOString().slice(0, 10);
    return (compareDate(date, new Date()) < 0)
    ? <StyledMonthViewTimeTableCell {...props} className={`prevDays day${date.getDay()}`} isShaded={true} otherMonth={false} onClick={reservationController.clickDate} data-date={dateString}/>
    : <StyledMonthViewTimeTableCell {...props} className={`nextDays day${date.getDay()}`} otherMonth={false} onClick={reservationController.clickDate} data-date={dateString}/>
  }, []);
  
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    const start = new Date();
    start.setDate(1);
    start.setDate(-start.getDay()+1);
    const end = new Date(start.getTime());
    end.setDate(end.getDate() + 41);
    
    axios.get(`/api/reservation/month?start=${start.toISOString().slice(0, 10)}&end=${end.toISOString().slice(0, 10)}`)
    .then(({data}) => {
      const val = data.map((el, idx) => ({
        id: idx,
        startDate: `${el.wish_date} 09:00:00`,
        endDate: `${el.wish_date} 09:00:20`,
        title: `${el.doctor}: ${el.count} 건`,
        doctor: `doctor${el.doctor}`}))
      setAppointments(val);
    });
  }, []);

  return (
      <Paper sx={{ height: 1 }}>
        <Scheduler data={appointments}>
          <ViewState currentDate={reservationModel.viewState} />
          <Button onClick={() => console.log('todo')}>prev</Button>
          <Button onClick={() => console.log('todo')}>next</Button>
          <MonthView timeTableCellComponent={MonthCell}/>
          <WeekView
            startDayHour={9}
            endDayHour={18}
            cellDuration={60}
            // timeScaleLayoutComponent={(props) => <WeekView.TimeScaleLayout {...props} height={700}/>} // timeScale height 전체 길이
            // timeTableLayoutComponent={(props) => <WeekView.TimeTableLayout {...props} height={700}/>} // timeTable 전체 길이
            // timeTableCellComponent={(props) => <WeekView.TimeTableCell {...props} style={{ height: 70 }}/>}
            // timeScaleTickCellComponent={(props) => <WeekView.TimeScaleTickCell {...props} style={{ height: 60 }}/>}
            timeScaleLabelComponent={(props) => (props.time
              ? <WeekView.TimeScaleLabel {...props} style={{ height: 80 }}/>
              :< WeekView.TimeScaleLabel {...props} style={{ height: 40 }}/>
            )}
            timeTableRowComponent={(props) => <WeekView.TimeTableRow {...props} style={{ height: 80 }}/>}
          />
          <Toolbar/>
          <ViewSwitcher />
          <Appointments appointmentComponent={Appointment}/>
        </Scheduler>
      </Paper>
  );
};

export default ReservationCalendar;
