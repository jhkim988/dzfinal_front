import { useReducer } from "react";
import ReservationController from './../controller/ReservationController';

const ACTION = {
    setViewDate: (state, action) => ({ ...state, viewDate: action.viewDate }),
    setDaySchedule: (state, action) => ({ ...state, daySchedule: action.daySchedule }),
    setDateTimePickerModal: (state, action) => ({...state, dateTimePickerModal: action.dateTimePickerModal }),
    setReservationFormModal: (state, action) => ({...state, reservationFormModal: action.reservationFormModal }),
}

const reducer = (state, action) => ACTION[action.type] ? ACTION[action.type](state, action) : state;

const ReservationModel = () => {
    const [state, dispatch] = useReducer(reducer, {
        viewDate: new Date(),
        daySchedule: [],
        dateTimePickerModal: false,
        reservationFormModal: false,
    });
    return [state, ReservationController({ state, dispatch })];
}

export default ReservationModel;