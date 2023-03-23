import React, { useCallback, useState, useRef, useEffect } from "react";
import {
  Paper,
  Button,
  Popper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Checkbox,
} from "@mui/material";
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
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { compareDate } from "./../utils/dateUtils";
import { doctorData } from "./../route/ReservationLayout";

const appointmentBackground = {
  1: "#F29D94",
  2: "#BEDEF3",
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
      color: "white",
      backgroundColor: appointmentBackground[restProps.data.doctor] || "blue",
      padding: "5px",
      borderRadius: "8px",
      // height: 42.5,
      height: '90%'
    }}
  >
  <div>{restProps.data.title}</div>
  </Appointments.Appointment>
);

const ReservationCalendar = ({
  viewDate,
  setViewDate,
  calendarAppointments,
  setViewCalendar,
}) => {
  const [doctorFilter, setDoctorFilter] = useState({
    1: true,
    2: true,
  });
  const [filterSelectorOpen, setFilterSelectorOpen] = useState(false);

  return (
    <Paper sx={{ height: 1 }}>
      <Scheduler
        data={calendarAppointments.filter(
          (appointment) => doctorFilter[appointment.doctor]
        ).map((appointment) => {
          const startDate = new Date(appointment.startDate);
          if (viewDate.viewCalendar === 'month') {
            startDate.setHours(9);
            startDate.setMinutes(appointment.doctor === '1' ? 0 : 1);
            appointment.startDate = startDate;
          } else if (viewDate.viewCalendar === 'week') {
            const endDate = new Date(appointment.endDate);
            if (startDate.getHours() === endDate.getHours()) {
              startDate.setMinutes(appointment.doctor === '1' ? 0 : 30);
              endDate.setMinutes(appointment.doctor === '1' ? 15 : 45);  
            } else {
              endDate.setHours(endDate.getHours()-1);
            }
            appointment.startDate = startDate;
            appointment.endDate = endDate;
          }
          return appointment;
        })}
      >
        <ViewState
          currentDate={viewDate.viewDate}
          currentViewName={viewDate.viewCalendar}
        />
        <Toolbar />
        <TodayButton
          className="todayButton"
          buttonComponent={() => (
            <>
              <TodayButton.Button
                setCurrentDate={setViewDate}
                getMessage={(str) => `TODAY`}
              />
              <NavigateButtonSet
                viewDate={viewDate}
                setViewDate={setViewDate}
              />
            </>
          )}
        />
        <MonthView
          timeTableCellComponent={(props) => (
            <MonthCell {...props} setViewDate={setViewDate} />
          )}
          name="month"
        />
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
          timeTableCellComponent={(props) => <WeekCell {...props} setViewDate={setViewDate}/>}
        />
        <ViewSwitcher
          switcherComponent={React.memo(({ ...restProps }) => {
            return (
              <>
                <DoctorFilterSelector
                  doctorFilter={doctorFilter}
                  setDoctorFilter={setDoctorFilter}
                  filterSelectorOpen={filterSelectorOpen}
                  setFilterSelectorOpen={setFilterSelectorOpen}
                />
                <ViewSwitcher.Switcher
                  {...restProps}
                  onChange={setViewCalendar}
                  sx={{ width: 130 }}
                />
              </>
            );
          })}
        />
        <Appointments appointmentComponent={Appointment} />
      </Scheduler>
    </Paper>
  );
};

const NavigateButtonSet = ({ viewDate, setViewDate }) => (
  <>
    <Button
      onClick={() => {
        if (viewDate.viewCalendar === "month") {
          setViewDate(
            new Date(viewDate.viewDate).setMonth(
              new Date(viewDate.viewDate).getMonth() - 1
            )
          );
        } else if (viewDate.viewCalendar === "week") {
          setViewDate(
            new Date(viewDate.viewDate).setDate(
              new Date(viewDate.viewDate).getDate() - 7
            )
          );
        }
      }}
    >
      <NavigateBeforeIcon />
    </Button>
    <h2>{`${viewDate.viewDate.getFullYear()}.${
      viewDate.viewDate.getMonth() + 1
    }`}</h2>
    <Button
      onClick={() => {
        if (viewDate.viewCalendar === "month") {
          setViewDate(
            new Date(viewDate.viewDate).setMonth(
              new Date(viewDate.viewDate).getMonth() + 1
            )
          );
        } else if (viewDate.viewCalendar === "week") {
          setViewDate(
            new Date(viewDate.viewDate).setDate(
              new Date(viewDate.viewDate).getDate() + 7
            )
          );
        }
      }}
    >
      <NavigateNextIcon />
    </Button>
  </>
);

const DoctorFilterSelector = ({
  filterSelectorOpen,
  setFilterSelectorOpen,
  doctorFilter,
  setDoctorFilter,
}) => {
  const [loaded, isLoaded] = useState(false);
  const anchorRef = useRef();
  const onCheckListItemClick = useCallback((e) => {
    setDoctorFilter((prev) => ({
      ...prev,
      [e.target.value]: !prev[e.target.value],
    }));
  }, []);

  const onClose = (e) => {
    if (anchorRef.current && anchorRef.current.contains(e.target)) {
      return;
    }
    setFilterSelectorOpen(false);
  };
  useEffect(() => {
    isLoaded(true);
  }, []);

  return (
    <>
      <FilterAltIcon
        sx={{ marginRight: 3, zIndex: 3 }}
        ref={anchorRef}
        onClick={(e) => {
          setFilterSelectorOpen((prev) => !prev);
        }}
      />
      {loaded ? (
        <Popper
          open={filterSelectorOpen}
          anchorEl={anchorRef.current}
          onClose={onClose}
          sx={{ zIndex: 2000 }}
        >
          <Paper>
            <List>
              {doctorData.map((doctor) => (
                <DoctorFilterListItem
                  key={`doctorFilterItem#${doctor.id}`}
                  doctor={doctor}
                  selectDoctor={doctorFilter}
                  onCheckListItemClick={onCheckListItemClick}
                />
              ))}
            </List>
          </Paper>
        </Popper>
      ) : (
        <></>
      )}
    </>
  );
};

const DoctorFilterListItem = ({
  doctor,
  selectDoctor,
  onCheckListItemClick,
}) => {
  return (
    <ListItem dense>
      <ListItemButton>
        <ListItemIcon>
          <Checkbox
            checked={selectDoctor[doctor.id]}
            value={doctor.id}
            onClick={onCheckListItemClick}
          />
        </ListItemIcon>
        <ListItemText primary={doctor.text} />
      </ListItemButton>
    </ListItem>
  );
};

const MonthCell = ({ startDate, setViewDate, ...restProps }) => {
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
      {...restProps}
      startDate={startDate}
      className={`prevDays day${date.getDay()}`}
      otherMonth={false}
      onClick={clickDate}
      data-date={dateString}
      isShaded={true}
    />
  ) : (
    <StyledMonthViewTimeTableCell
      {...restProps}
      startDate={startDate}
      className={`nextDays day${date.getDay()}`}
      otherMonth={false}
      onClick={clickDate}
      data-date={dateString}
    />
  );
};

const WeekCell = ({ setViewDate, ...restProps }) => {
  const { startDate } = restProps;
  const onClick = e => {
    setViewDate(new Date(e.currentTarget.dataset.date));
  }
  return <WeekView.TimeTableCell {...restProps} data-date={startDate} onClick={onClick}/>
}
export default ReservationCalendar;
