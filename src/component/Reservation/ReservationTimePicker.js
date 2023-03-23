import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { Button, Paper } from "@mui/material";
import axios from "axios";
import { offsetDate } from "../utils/dateUtils";
const compare = (t1, t2) => {
  return t1.getTime() - t2.getTime();
};
const getTimeArr = (start, end, intervalMinutes) => {
  const initTime = new Date(`2023-03-16 ${start}`);
  const endTime = new Date(`2023-03-16 ${end}`);
  const timeInterval = intervalMinutes * 60_000;
  const ret = [];
  for (
    let time = new Date(initTime);
    compare(time, endTime) < 0;
    time = new Date(time.getTime() + timeInterval)
  ) {
    ret.push(time);
  }
  return ret.map(
    (time) =>
      `${time.getHours().toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })}:${time.getMinutes().toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })}`
  );
};

const ReservationTimePicker = ({
  reservationFormData,
  setReservationFormData,
  pickDate,
  doctor,
}) => {
  const timeArr = getTimeArr("09:00:00", "18:00:00", 20);
  const [impossible, setImpossible] = useState(new Set(timeArr));
  useEffect(() => {
    axios
      .get(`/api/reservation/impossible/time`, {
        params: {
          doctor,
          date: offsetDate(pickDate),
        },
      })
      .then(({ data }) => {
        setImpossible(new Set(data));
      });
  }, [pickDate]);

  return (
    <Paper style={{ width: 320, padding: 10, margin: "auto" }}>
      <Grid container>
        {timeArr.map((timeStr) => (
          <Grid item xs={3} key={`${timeStr}#reservationTime`}>
            <Button
              variant={
                reservationFormData.wish_time === timeStr
                  ? "contained"
                  : "outlined"
              }
              disabled={impossible.has(timeStr)}
              style={{ width: 80, margin: "3px" }}
              key={`reservationTimeSelect#${timeStr}`}
              value={timeStr}
              onClick={(e) => {
                setReservationFormData({
                  ...reservationFormData,
                  date_time: `${reservationFormData.wish_date} ${e.currentTarget.value}`,
                  wish_time: e.currentTarget.value,
                });
              }}
            >
              {timeStr}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default React.memo(ReservationTimePicker);
