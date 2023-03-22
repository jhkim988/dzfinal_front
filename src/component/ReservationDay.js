import React from "react";
import { useCallback, useState, useEffect } from "react";
import { Paper } from "@mui/material";
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
import axios from "axios";
import { compareDate, offsetDate, offsetString, offsetDateObj } from './../utils/dateUtils';
import ReservationForm from './ReservationForm';
import ReservationDateTimePickerModal from "./ReservationDateTimePickerModal";

const appointmentBackground = {
  '1': "#F29D94",
  '2': "#BEDEF3",
};

const doctorData = [
  { text: "김더존", id: '1', color: "F29D94" },
  { text: "이을지", id: '2', color: "BEDEF3" },
];

const resources = [
  { fieldName: "doctor", title: "doctor", instances: doctorData },
];

const ReservationDay = ({
  viewDate,
  daySchedule,
  setCalendarAppointments,
  setDaySchedule,
}) => {
  const [reservationFormModal, setReservationFormModal] = useState({
    modalState: false,
    mode: 'POST' // POST or PUT
  });
  const [reservationFormData, setReservationFormData] = useState({
    patient_id: 0,
    patient_name: '',
    phone1: '',
    phone2: '',
    phone3: '',
    date_time: '',
    wish_date: '',
    wish_time: '',
    state: "예약중",
    doctor: 1,
    treatment_reason: '',
  });
  const [dateTimePickerModal, setDateTimePickerModal] = useState(false);
  const [pickDate, setPickDate] = useState(new Date(reservationFormData.wish_date));
  const [pickTime, setPickTime] = useState(new Date(reservationFormData.wish_time));

  // month/week
  const loadCalendar = useCallback(() => {
    if (viewDate.viewCalendar === "month") {
      axios
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
          ).setMinutes(startDate.getMinutes() + 20);
          return {
            id: idx,
            startDate,
            endDate,
            title: `${doctorData.find(data => data.id === el.doctor).text}: ${el.count} 건`,
            doctor: el.doctor,
          };
        });
        console.log(val);
        setCalendarAppointments(val);
      });
    } else if (viewDate.viewCalendar === "week") {
      axios.get(`/api/reservation/week`, {
        params: {
          start: offsetDate(viewDate.startDate),
          end: offsetDate(viewDate.endDate)
        }
      }).then(({ data }) => {
        const val = data.map((el, idx) => {
          const startDate = new Date(`${el.wish_date} ${el.wish_time}`);
          const endDate = new Date(
            `${el.wish_date} ${el.wish_time}`
          ).setMinutes(startDate.getMinutes() + 30);
          return {
            id: idx,
            startDate,
            endDate,
            title: `${doctorData.find(data => data.id === el.doctor).text}: ${el.count} 건`,
            doctor: el.doctor,
          };
        });
        setCalendarAppointments(val);
      })
    }
  }, [setCalendarAppointments, viewDate.startDate, viewDate.endDate, viewDate.viewCalendar])
  useEffect(loadCalendar, [setCalendarAppointments, viewDate.startDate, viewDate.endDate, viewDate.viewCalendar]);
  
  // day
  const loadDayAppointments = useCallback((dateStr) => {
    axios.get(`/api/reservation/day?target=${dateStr}`)
    .then(({data}) => {
      setDaySchedule(data.map((el, idx) => {
        const startDate = new Date(`${dateStr} ${el.wish_time}`);
        const endDate = new Date(`${dateStr} ${el.wish_time}`);
        endDate.setMinutes(endDate.getMinutes() + 20);
        return { startDate, endDate, title: `${el.patient_name} - ${el.treatment_reason}`, doctor: el.doctor, reservation_id: el.reservation_id }
        }));
      })
    }, []);
  useEffect(() => loadDayAppointments(offsetDate(viewDate.viewDate)), [viewDate.viewDate]);

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
    setReservationFormModal({ modalState: true, mode: "POST" });
    setReservationFormData({
      patient_id: 0,
      patient_name: '',
      phone1: '',
      phone2: '',
      phone3: '',
      date_time: `${date} ${time}`,
      wish_date: date,
      wish_time: time,
      state: "예약중",
      treatment_reason: '',
      doctor: e.currentTarget.dataset.doctor,
    });
    setPickDate(dateObj);
    setPickTime(time);
  }, []);

  const Appointment = ({ children, style, ...restProps }) => {
    return (
    <Appointments.Appointment
      {...restProps}
      style={{
        ...style,
        color: "white",
        padding: "5px",
        backgroundColor: appointmentBackground[restProps.data.doctor] || "blue",
        borderRadius: "8px",
      }}
      onClick={() => {
        axios.get(`/api/reservation/${restProps.data.reservation_id}`)
          .then(({data}) => {
            const data_date = new Date(data.wish_date);
            const wish_date = offsetDate(data_date);
            setReservationFormData({
              reservation_id: data.reservation_id,
              patient_id: data.patient_id,
              patient_name: data.patient_name,
              phone1: data.phone1,
              phone2: data.phone2,
              phone3: data.phone3,
              date_time: `${wish_date} ${data.wish_time}`,
              wish_date: wish_date,
              wish_time: data.wish_time,
              state: data.state,
              doctor: data.doctor,
              treatment_reason: data.treatment_reason,
            });
            setReservationFormModal({ modalState: true, mode: 'PUT'});
        });
      }}>
      <div>{restProps.data.title}</div>
    </Appointments.Appointment>
  )};

  return (
    <>
    <Paper sx={{ height: 1 }}>
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
              data-datetime={props.startDate}
              data-doctor={props.groupingInfo[0].id}
              style={{ height: 30 }}
              onClick={clickEmptyCell}
            />
          )}
          // timeTableLayoutComponent={(props) => (
            // <DayView.TimeTableLayout {...props} style={{ height: 800 }} />
          // )}
          timeScaleLabelComponent={(props) => {
            if (!props.time)
              return (
                <DayView.TimeScaleLabel {...props} style={{ height: 15 }} />
              );
            else
              return (
                <DayView.TimeScaleLabel {...props} style={{ height: 30 }} />
              );
          }}
          timeScaleTickCellComponent={() => (
            <DayView.TimeScaleTickCell style={{ height: 30 }} />
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
      reservationFormData={reservationFormData}
      setReservationFormData={setReservationFormData}
      setDateTimePickerModal={setDateTimePickerModal}
      pickDate={pickDate}
      loadCalendar={loadCalendar}
      loadDayAppointments={loadDayAppointments}
    />
    <ReservationDateTimePickerModal
      setDateTimePickerModal={setDateTimePickerModal}
      dateTimePickerModal={dateTimePickerModal}
      reservationFormData={reservationFormData}
      setReservationFormData={setReservationFormData}
      pickDate={pickDate}
      setPickDate={setPickDate}
      pickTime={pickTime}
      setPickTime={setPickTime}
    />
    </>
  );
};

export default React.memo(ReservationDay);
