import React, { useCallback, useState, useEffect, useContext } from "react";
import { Paper } from "@mui/material";
import { styled } from '@mui/material/styles';
import {
  Scheduler,
  DayView,
  Appointments,
  GroupingPanel,
  Resources,
} from "@devexpress/dx-react-scheduler-material-ui";
import {
  GroupingState,
  ViewState,
  IntegratedGrouping,
} from "@devexpress/dx-react-scheduler";
import { compareDate, offsetDate } from './utils/dateUtils';
import ReservationForm from './ReservationForm';
import axiosClient from './../login/AxiosClient';
import { DataContext } from './../loading/DataContextProvider';


const cellHeight = 2.7;

const ReservationDay = ({
  viewDate,
  setViewDate,
  daySchedule,
  setCalendarAppointments,
  setDaySchedule,
}) => {
  const doctorData = React.useContext(DataContext);
  const resources = [
    { fieldName: "doctor", title: "doctor", instances: doctorData.map((el) => ({ id: `${el.employ_id}`, text: el.employee_name, color: el.color })) }
  ];
  const [reservationFormModal, setReservationFormModal] = useState({
    modalState: false,
    mode: 'POST', // POST or PUT
    doctor: 1
  });

  const [pickDate, setPickDate] = useState(new Date());
  const [pickTime, setPickTime] = useState('');
  // month/week
  const loadCalendar = useCallback((viewDate) => {
    if (viewDate.viewCalendar === "month") {
      axiosClient
      .get(`/api/reservation/month`, {
        params: {
          start: offsetDate(viewDate.startDate),
          end: offsetDate(viewDate.endDate),
        },
      })
      .then(({ data }) => {
        const val = data.map((el, idx) => {
          const startDate = new Date(`${el.wish_date} ${el.wish_time}`);
          const endDate = new Date(
            `${el.wish_date} ${el.wish_time}`
          );
          endDate.setMinutes(startDate.getMinutes() + 20);
          return {
            id: idx,
            startDate,
            endDate,
            title: `${doctorData.find(data => `${data.employ_id}` === `${el.doctor}`)?.employee_name}: ${el.count} 건`,
            doctor: el.doctor,
          };
        });
        setCalendarAppointments(val);
      });
    } else if (viewDate.viewCalendar === "week") {
      axiosClient.get(`/api/reservation/week`, {
        params: {
          start: offsetDate(viewDate.startDate),
          end: offsetDate(viewDate.endDate)
        }
      }).then(({ data }) => {
        const val = data.map((el, idx) => {
          const startDate = new Date(`${el.wish_date} ${el.wish_time}`);
          const endDate = new Date(
            `${el.wish_date} ${el.wish_time}`
          );
          endDate.setMinutes(startDate.getMinutes() + 20);
          return {
            id: idx,
            startDate,
            endDate,
            title: `${doctorData.find(data => `${data.employ_id}` === `${el.doctor}`).employee_name}: ${el.count} 건`,
            doctor: el.doctor,
          };
        });
        setCalendarAppointments(val);
      })
    }
  }, [doctorData, setCalendarAppointments]);
  useEffect(() => loadCalendar(viewDate), [loadCalendar, setCalendarAppointments, viewDate]);
  
  // day
  const loadDayAppointments = useCallback((dateStr) => {
    axiosClient.get(`/api/reservation/day?target=${dateStr}`)
    .then(({data}) => {
      setDaySchedule(data.map((el, idx) => {
        const startDate = new Date(`${dateStr} ${el.wish_time}`);
        const endDate = new Date(`${dateStr} ${el.wish_time}`);
        endDate.setMinutes(endDate.getMinutes() + 20);
        return { startDate, endDate, title: `${el.patient_name} - ${el.treatment_reason}`, doctor: el.doctor, reservation_id: el.reservation_id }
        }));
      })
    }, []);
  useEffect(() => loadDayAppointments(offsetDate(viewDate.viewDate)), [loadDayAppointments, viewDate.viewDate]);

  const clickEmptyCell = useCallback((e) => {
    const dateObj = new Date(e.currentTarget.dataset.datetime);
    if (compareDate(dateObj, new Date()) <= 0) return;
    const date = offsetDate(dateObj);
    const time = `${dateObj.getHours().toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })}:${dateObj.getMinutes().toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })}`;
    setPickDate(dateObj);
    setPickTime(time);
    setReservationFormModal({ modalState: true, mode: "POST", doctor: parseInt(e.currentTarget.dataset.doctor) });
  }, []);

  const Appointment = ({ children, style, ...restProps }) => {
    const doctorData = useContext(DataContext);
    const onClick = (e) => {
      setReservationFormModal({ modalState: true, mode: 'PUT', reservation_id: restProps.data.reservation_id });
    }
    return (
    <Appointments.Appointment
      {...restProps}
      style={{
        ...style,
        color: "white",
        padding: "5px",
        backgroundColor: `#${doctorData.find(d => `${d.employ_id}` === `${restProps.data.doctor}`).color}`,
        borderRadius: "8px",
      }}
      onClick={onClick}>
      <div>{restProps.data.title}</div>
    </Appointments.Appointment>
  )};

  const requestSuccessCallback = useCallback(({ wish_date }) => {
    loadCalendar(viewDate);
    loadDayAppointments(wish_date);
    setViewDate(wish_date);
  }, []);

  return (
    <>
    <Paper>
      <Scheduler data={daySchedule}>
        <ViewState currentDate={viewDate.viewDate} />
        <GroupingState grouping={[{ resourceName: "doctor" }]} />
        <DayView
          startDayHour={9}
          endDayHour={18}
          cellDuration={20}
          timeTableCellComponent={(props) => (
            <DayView.TimeTableCell
              {...props}
              isShaded={compareDate(props.startDate, new Date()) <= 0}
              data-datetime={props.startDate}
              data-doctor={props.groupingInfo[0].id}
              style={{ height: `${cellHeight}vh` }}
              onClick={clickEmptyCell}
            />
          )}
          // timeTableLayoutComponent={(props) => (
            // <DayView.TimeTableLayout {...props} style={{ height: 640 }} />
          // )}
          timeScaleLabelComponent={styled((props) => {
            if (!props.time)
              return (
                <DayView.TimeScaleLabel {...props} style={{ height: `${cellHeight/2}vh` }} />
              );
            else
              return (
                <DayView.TimeScaleLabel {...props} style={{ height: `${cellHeight}vh` }} />
              );
          })({
            '&.Label-label': {
              lineHeight: '0px'
            }
          })}
          timeScaleTickCellComponent={() => (
            <DayView.TimeScaleTickCell style={{ height: `${cellHeight}vh` }} />
          )}
        />
        <Appointments appointmentComponent={Appointment} />
        <Resources data={resources} mainResourceName="doctor" />
        <IntegratedGrouping />
        <GroupingPanel
          cellComponent={(props) => <GroupingPanel.Cell {...props} />}
        />
      </Scheduler>
    </Paper>
    <ReservationForm
      reservationFormModal={reservationFormModal}
      setReservationFormModal={setReservationFormModal}
      pickDate={pickDate}
      setPickDate={setPickDate}
      pickTime={pickTime}
      setPickTime={setPickTime}
      requestSuccessCallback={requestSuccessCallback}
    />
    </>
  );
};

export default ReservationDay;
