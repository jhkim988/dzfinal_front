import axios from 'axios';

const ReservationController = ({ state, dispatch }) => {
    const clickDate = (e) => {
        const date = e.currentTarget.dataset.date;
        axios.get(`/api/reservation/day?target=${date}`)
        .then(({data}) => {
          dispatch({ type: 'setDaySchedule', daySchedule: data.map((el, idx) => ({ startDate: `${date} ${el.time}`, title: data.patient_name }))});
          dispatch({ type: 'setViewDate', viewDate: date });
        })
    }

    const setReservationFormModal = (val) => {
        dispatch({ type: 'setReservationFormModal', reservationFormModal: val });
    }

    const setDateTimePickerModal = (val) => {
        dispatch({ type: 'setDateTimePickerModal', dateTimePickerModal: val });
    }

    return {
        clickDate,
        setReservationFormModal,
        setDateTimePickerModal,
    }
}

export default ReservationController;