import React, { useCallback } from "react";
import { Paper, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  MonthView,
  WeekView,
  Appointments,
  Toolbar,
  ViewSwitcher,
  TodayButton,
} from "@devexpress/dx-react-scheduler-material-ui";
import { compareDate } from './../utils/dateUtils';

const appointmentBackground = {
  '1': "#F29D94",
  '2': "#BEDEF3",
};

const StyledMonthViewTimeTableCell = styled(MonthView.TimeTableCell)(
  ({ theme }) => ({
    [`&.prevDays`]: {
      backgroundColor: "#E8E8E8",
      opacity: 0.5,
      height: 125,
    },
    [`&.nextDays`]: {
      backgroundColor: "white",
      height: 125,
    },
    [`&.day${0}`]: {
      color: "red",
    },
    [`&.day${6}`]: {
      color: "blue",
    },
  })
);

const Appointment = ({ children, style, ...restProps }) => (
  <Appointments.Appointment
    {...restProps}
    style={{
      ...style,
      backgroundColor: appointmentBackground[restProps.data.doctor] || "blue",
      borderRadius: "8px",
    }}
  >
    {children}
  </Appointments.Appointment>
);

const ReservationCalendar = ({
  viewDate,
  setViewDate,
  calendarAppointments,
  setViewCalendar,
}) => {
  const MonthCell = (props) => {
    const { startDate } = props;
    const date = new Date(
      startDate.getTime() - startDate.getTimezoneOffset() * 60_000
    );
    const dateString = date.toISOString().slice(0, 10);
    const clickDate = useCallback((e) => {
      const dateStr = e.currentTarget.dataset.date;
      setViewDate(dateStr);  
    }, []);

    return compareDate(date, new Date()) <= 0 ? (
      <StyledMonthViewTimeTableCell
        {...props}
        className={`prevDays day${date.getDay()}`}
        otherMonth={false}
        onClick={clickDate}
        data-date={dateString}
        isShaded={true}
      />
    ) : (
      <StyledMonthViewTimeTableCell
        {...props}
        className={`nextDays day${date.getDay()}`}
        otherMonth={false}
        onClick={clickDate}
        data-date={dateString}
      />
    );
  };
  return (
    <Paper sx={{ height: 1 }}>
      <Scheduler data={calendarAppointments}>
        <ViewState currentDate={viewDate.viewDate} currentViewName={viewDate.viewCalendar} />
        <Toolbar />
        <TodayButton buttonComponent={() => <TodayButton.Button
          setCurrentDate={setViewDate}
          getMessage={(str) => `TODAY`}/>
        } />
        <Button onClick={() => {
          if (viewDate.viewCalendar === 'month') {
            setViewDate(new Date(viewDate.viewDate).setMonth(new Date(viewDate.viewDate).getMonth()-1));
          } else if (viewDate.viewCalendar === 'week') {
            setViewDate(new Date(viewDate.viewDate).setDate(new Date(viewDate.viewDate).getDate()-7));
          }
        }}>prev</Button>
        <Button onClick={() => {
          if (viewDate.viewCalendar === 'month') {
            setViewDate(new Date(viewDate.viewDate).setMonth(new Date(viewDate.viewDate).getMonth()+1));
          } else if (viewDate.viewCalendar === 'week') {
            setViewDate(new Date(viewDate.viewDate).setDate(new Date(viewDate.viewDate).getDate()+7));
          }
        }}>next</Button>
        <MonthView timeTableCellComponent={MonthCell} name="month"/>
        <WeekView
          name="week"
          startDayHour={9}
          endDayHour={18}
          cellDuration={60}
          // timeScaleLayoutComponent={(props) => <WeekView.TimeScaleLayout {...props} height={700}/>} // timeScale height 전체 길이
          // timeTableLayoutComponent={(props) => <WeekView.TimeTableLayout {...props} height={700}/>} // timeTable 전체 길이
          // timeTableCellComponent={(props) => <WeekView.TimeTableCell {...props} style={{ height: 70 }}/>}
          // timeScaleTickCellComponent={(props) => <WeekView.TimeScaleTickCell {...props} style={{ height: 60 }}/>}
          timeScaleLabelComponent={(props) =>
            props.time ? (
              <WeekView.TimeScaleLabel {...props} style={{ height: 80 }} />
            ) : (
              <WeekView.TimeScaleLabel {...props} style={{ height: 40 }} />
            )
          }
          timeTableRowComponent={(props) => (
            <WeekView.TimeTableRow {...props} style={{ height: 80 }} />
          )}
        />
        <ViewSwitcher switcherComponent={(props) => <ViewSwitcher.Switcher {...props} onChange={setViewCalendar}/>}/>
        <Appointments appointmentComponent={Appointment} />
      </Scheduler>
    </Paper>
  );
};

export default ReservationCalendar;
