import * as React from "react";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
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

const MonthCell = (props) => {
  const {startDate} = props;
  const date = new Date(startDate);
  if (compareDate(date, new Date()) < 0) {
    return <StyledMonthViewTimeTableCell {...props} className={`prevDays day${date.getDay()}`} isShaded={true} otherMonth={false}/>
  } else {
    return <StyledMonthViewTimeTableCell {...props} className={`nextDays day${date.getDay()}`} otherMonth={false}/>
  }
}

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

const ReservationMonth = () => {
  const [viewDate, setViewDate] = useState(new Date());
  const minusMonth = () => {
    viewDate.setMonth(viewDate.getMonth()-1);
    setViewDate(new Date(viewDate.toISOString()));
  }
  const plusMonth = () => {
    viewDate.setMonth(viewDate.getMonth()+1);
    setViewDate(new Date(viewDate.toISOString()));
  }

  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    axios.get(`/api/reservation/month?start=${'2023-02-26'}&end=${'2023-04-08'}`)
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
    <>
      <Paper sx={{ height: 1 }}>
        <Scheduler data={appointments}>
          <ViewState currentDate={viewDate} />
          <Button onClick={minusMonth}>prev</Button>
          <Button onClick={plusMonth}>next</Button>
          <MonthView timeTableCellComponent={MonthCell}/>
          <WeekView startDayHour={9} endDayHour={18} cellDuration={60} timeScaleLayoutComponent={<WeekView.TimeScaleLayoutComponent height={110}/>}/>
          <Toolbar/>
          <ViewSwitcher />
          <Appointments appointmentComponent={Appointment}/>
        </Scheduler>
      </Paper>
    </>
  );
};

export default ReservationMonth;
