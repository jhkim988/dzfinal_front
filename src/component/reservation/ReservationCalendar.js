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
import { compareDate } from "./utils/dateUtils";
import { useContext } from "react";
import { DataContext } from "../loading/DataContextProvider";

const cellHeight = 70;
const height = `12vh`;

const StyledMonthViewTimeTableCell = styled(MonthView.TimeTableCell)(
  ({ theme }) => ({
    [`&.prevDays`]: {
      backgroundColor: "#E8E8E8",
      opacity: 0.5,
      height,
    },
    [`&.nextDays`]: {
      backgroundColor: "white",
      height,
    },
    [`&.day${0}`]: {
      color: "red",
    },
    [`&.day${6}`]: {
      color: "blue",
    },
  })
);

const Appointment = ({ children, style, setViewDate, ...restProps }) => {
  const doctorData = useContext(DataContext);
  return (
    <Appointments.Appointment
      {...restProps}
      style={{
        ...style,
        color: "white",
        backgroundColor: `#${
          doctorData.find(
            (d) => `${d.employ_id}` === `${restProps.data.doctor}`
          ).color
        }`,
        padding: "5px",
        borderRadius: "8px",
        // height: 42.5,
        height: "90%",
      }}
      onClick={() => {
        setViewDate(restProps.data.startDate);
      }}
    >
      <div>{restProps.data.title}</div>
    </Appointments.Appointment>
  );
};

const ReservationCalendar = ({
  viewDate,
  setViewDate,
  calendarAppointments,
  setViewCalendar,
}) => {
  const doctorData = useContext(DataContext);
  const [doctorFilter, setDoctorFilter] = useState(
    doctorData.reduce((acc, cur) => {
      acc[cur.employ_id] = true;
      return acc;
    }, {})
  );
  const [filterSelectorOpen, setFilterSelectorOpen] = useState(false);
  const [appointmentData, setAppointmentData] = useState([]);
  useEffect(() => {
    setAppointmentData(() => {
      const ret = calendarAppointments
        .filter((appointment) => doctorFilter[appointment.doctor])
        .map((appointment) => {
          const startDate = new Date(appointment.startDate);
          if (viewDate.viewCalendar === "month") {
            startDate.setHours(9);
            startDate.setMinutes(0);
            appointment.startDate = startDate;
          } else if (viewDate.viewCalendar === "week") {
            const endDate = new Date(appointment.endDate);
            if (startDate.getHours() !== endDate.getHours()) {
              endDate.setHours(endDate.getHours() - 1);
            }
            startDate.setMinutes(appointment.doctor === "1" ? 0 : 30);
            endDate.setMinutes(appointment.doctor === "1" ? 15 : 45);
            appointment.startDate = startDate;
            appointment.endDate = endDate;
          }
          return appointment;
        });
      // console.log(ret);
      return ret;
    });
  }, [viewDate.viewCalendar, calendarAppointments, doctorFilter]);
  console.log(appointmentData);
  return (
    <Paper>
      <Scheduler data={appointmentData}>
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
          timeTableLayoutComponent={(props) => (
            <WeekView.TimeTableLayout {...props} height={640} />
          )} // timeTable 전체 길이
          timeScaleLabelComponent={(props) =>
            props.time ? (
              <WeekView.TimeScaleLabel
                {...props}
                style={{ height: cellHeight }}
              />
            ) : (
              <WeekView.TimeScaleLabel
                {...props}
                style={{ height: cellHeight / 2 }}
              />
            )
          }
          timeTableRowComponent={(props) => (
            <WeekView.TimeTableRow {...props} style={{ height: cellHeight }} />
          )}
          timeTableCellComponent={(props) => (
            <WeekCell {...props} setViewDate={setViewDate} />
          )}
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
        <Appointments
          appointmentComponent={(props) => (
            <Appointment {...props} setViewDate={setViewDate} />
          )}
        />
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
  const doctorData = useContext(DataContext);
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
    const click = (e) => {
      if (anchorRef.current && anchorRef.current.contains(e.target)) {
        setFilterSelectorOpen((prev) => !prev);
      } else {
        setFilterSelectorOpen(false);
      }
    };

    document.addEventListener("click", click);
    return () => {
      document.removeEventListener("click", click);
    };
  }, []);

  return (
    <>
      <FilterAltIcon sx={{ marginRight: 3, zIndex: 3 }} ref={anchorRef} />
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
                  key={`doctorFilterItem#${doctor.employ_id}`}
                  doctor={doctor}
                  selectDoctor={doctorFilter}
                  value={doctor.employ_id}
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

export const DoctorFilterListItem = ({
  doctor,
  selectDoctor,
  onCheckListItemClick,
}) => {
  return (
    <ListItem dense>
      <ListItemButton>
        <ListItemIcon>
          <Checkbox
            checked={selectDoctor[doctor.employ_id]}
            value={doctor.employ_id}
            onClick={onCheckListItemClick}
          />
        </ListItemIcon>
        <ListItemText primary={doctor.employee_name} />
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
  const onClick = (e) => {
    setViewDate(new Date(e.currentTarget.dataset.date));
  };
  return (
    <WeekView.TimeTableCell
      {...restProps}
      data-date={startDate}
      onClick={onClick}
    />
  );
};
export default ReservationCalendar;
