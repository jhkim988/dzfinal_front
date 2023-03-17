import { useState } from "react";
import { Grid, ToggleButtonGroup } from "@mui/material";
import { Button, Paper } from "@mui/material";

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
  return ret;
};

const ReservationTimePicker = ({
  reservationFormData,
  setReservationFormData,
}) => {
  const timeArr = getTimeArr("09:00:00", "18:00:00", 20);
  return (
    <Paper style={{ width: 320, padding: 10, margin: "auto" }}>
      <Grid container>
        {timeArr.map((time) => {
          const timeStr = `${time.getHours().toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}:${time.getMinutes().toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}`;
          return (
            <Grid item xs={3} key={`${timeStr}#reservationTime`}>
              <Button
                variant={
                  reservationFormData.time === timeStr
                    ? "contained"
                    : "outlined"
                }
                disabled={time.getHours() === 9}
                style={{ width: 80, margin: "3px" }}
                key={`reservationTimeSelect#${timeStr}`}
                value={timeStr}
                onClick={(e) =>
                  setReservationFormData({
                    ...reservationFormData,
                    date_time: `${reservationFormData.date} ${e.currentTarget.value}`,
                    time: e.currentTarget.value,
                  })
                }
              >
                {timeStr}
              </Button>
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
};

export default ReservationTimePicker;
