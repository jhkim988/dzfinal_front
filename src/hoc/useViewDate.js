import { useState } from "react";

const monthStartDate = (date) => {
  const copy = new Date(date);
  copy.setDate(1);
  copy.setDate(-copy.getDay());
  return copy;
};

const monthEndDate = (date) => {
  const copy = new Date(date);
  copy.setDate(1);
  copy.setDate(-copy.getDay());
  copy.setDate(copy.getDate() + 41);
  return copy;
};

const weekStartDate = (date) => {
  const copy = new Date(date);
  copy.setDate(copy.getDate()-copy.getDay());
  return copy;
}

const weekEndDate = (date) => {
  const copy = new Date(date);
  copy.setDate(copy.getDate()+6-copy.getDay());
  return copy;
}

const dateEqualsTo = (d1, d2) => {
  return d1.getYear() === d2.getYear()
    && d1.getMonth() === d2.getMonth()
    && d1.getDate() === d2.getDate(); 
}

const useViewDate = () => {
  const [state, setState] = useState({
    viewDate: new Date(),
    viewCalendar: "month", // "month or week"
    startDate: monthStartDate(new Date()),
    endDate: monthEndDate(new Date()),
  });

  const setViewCalendar = (viewCalendar) => {
    let change = { viewCalendar };
    let startDate = state.startDate;
    let endDate = state.endDate;
    if (viewCalendar === "month") {
      startDate = monthStartDate(state.viewDate);
      endDate = monthEndDate(state.viewDate);
    } else if (viewCalendar === "week") {
      startDate = weekStartDate(state.viewDate);
      endDate = weekEndDate(state.viewDate);
      console.log(state.viewDate);
      console.log(startDate);
      console.log(endDate);
    }
    if (!dateEqualsTo(state.startDate, startDate)) {
      change = { ...change, startDate }
    }
    if (!dateEqualsTo(state.endDate, endDate)) {
      change = {...change, endDate};
    }
    setState({...state, ...change});
  }

  const setViewDate = (dateStr) => {
    const viewDate = new Date(dateStr);
    let change = { viewDate }
    let startDate = state.startDate;
    let endDate = state.endDate;
    if (state.viewCalendar === "month") {
      startDate = monthStartDate(viewDate);
      endDate = monthEndDate(viewDate);
    } else if (state.viewCalendar === "week") {
      startDate = weekStartDate(viewDate);
      endDate = weekEndDate(viewDate);
    }
    if (!dateEqualsTo(state.startDate, startDate)) {
      change = {...change, startDate};
    }
    if (!dateEqualsTo(state.endDate, endDate)) {
      change = {...change, endDate};
    }
    setState({...state, ...change});
  }

  return { viewDate: state, setViewCalendar, setViewDate }
};

export default useViewDate;
