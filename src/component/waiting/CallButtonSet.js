import React, { useRef, useState } from "react";
import { Grid, Button, Switch, Popper, Paper, List } from "@mui/material";
import { Tooltip } from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { DoctorFilterListItem } from "../reservation/ReservationCalendar";
import { doctorData } from "../reservation/Reservation";

const CallButtonSet = ({ callPatient, selected, autoCall, setAutoCall, disabled, doctorFilter, setDoctorFilter }) => {
  const filterIcon = useRef();
  const [openFilterSelector, setOpenFilterSelector] = useState(false);
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Button
          variant="contained"
          disabled={disabled}
          sx={{ width: "100%", margin: 1 }}
          onClick={e => {
            if (selected === null) return;
            callPatient(selected);  
          }}
        >
          호출
        </Button>
      </Grid>
      <Grid item xs={2}>
        <FilterAltIcon sx={{ margin: "1", height: "100%" }} ref={filterIcon} onClick={() => setOpenFilterSelector(!openFilterSelector)}/>
        <Popper
          open={openFilterSelector}
          anchorEl={filterIcon.current}
          onClose={() => setOpenFilterSelector(false)}
          sx={{ zIndex: 2000 }}
        >
          <Paper>
            <List>
              {doctorData.map((doctor) => (
                <DoctorFilterListItem
                  key={`doctorFilterItem#${doctor.id}`}
                  doctor={doctor}
                  selectDoctor={doctorFilter}
                  onCheckListItemClick={() => { setDoctorFilter(prev => ({...prev, [doctor.id]: !prev[doctor.id]})) }}
                />
              ))}
            </List>
          </Paper>
        </Popper>
      </Grid>
      <Grid item xs={2}>
        <Tooltip title="자동호출">
          <Switch sx={{ margin: 1 }} checked={autoCall} onChange={e => setAutoCall(e.target.checked)}/>
        </Tooltip>
      </Grid>
    </Grid>
  );
};

export default React.memo(CallButtonSet);
