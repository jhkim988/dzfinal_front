import React, { useRef, useState, useEffect } from "react";
import { Grid, Button, Switch, Popper, Paper, List } from "@mui/material";
import { Tooltip } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { DoctorFilterListItem } from "../reservation/ReservationCalendar";
import { DataContext } from "../loading/DataContextProvider";

const CallButtonSet = ({
  callPatient,
  selected,
  setAutoCall,
  disabledCallButton,
  doctorFilter,
  setDoctorFilter,
}) => {
  const doctorData = React.useContext(DataContext);
  const filterIcon = useRef();
  const [openFilterSelector, setOpenFilterSelector] = useState(false);
  const [autoCallSwitch, setAutoCallSwitch] = useState(false);
  const onSwitchToggle = (e) => {
    setAutoCallSwitch((prev) => !prev);
    setAutoCall(e.target.checked);
  };

  useEffect(() => {
    const click = e => {
      if (filterIcon.current && filterIcon.current.contains(e.target)) {
        setOpenFilterSelector(prev => !prev);
      } else {
        setOpenFilterSelector(false);
      }
    };
    document.addEventListener('click', click);
    return () => {
      document.removeEventListener('click', click);
    }
  }, [])

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Button
          variant="contained"
          disabled={disabledCallButton}
          sx={{ width: "100%", margin: 1 }}
          onClick={(e) => {
            if (!selected) return;
            callPatient(selected.reception_id);
          }}
        >
          호출
        </Button>
      </Grid>
      <Grid item xs={2}>
        <FilterAltIcon
          sx={{ margin: "1", height: "100%" }}
          ref={filterIcon}
          // onClick={() => setOpenFilterSelector(!openFilterSelector)}
        />
        <Popper
          open={openFilterSelector}
          anchorEl={filterIcon.current}
          // onClose={() => setOpenFilterSelector(false)}
          sx={{ zIndex: 2000 }}
        >
          <Paper>
            <List>
              {doctorData.map((doctor) => (
                <DoctorFilterListItem
                  key={`doctorFilterItem#${doctor.employ_id}`}
                  doctor={doctor}
                  selectDoctor={doctorFilter}
                  onCheckListItemClick={() => {
                    setDoctorFilter((prev) => ({
                      ...prev,
                      [doctor.employ_id]: !prev[doctor.employ_id],
                    }));
                  }}
                />
              ))}
            </List>
          </Paper>
        </Popper>
      </Grid>
      <Grid item xs={2}>
        <Tooltip title="자동호출">
          <Switch
            sx={{ margin: 1 }}
            checked={autoCallSwitch}
            onChange={onSwitchToggle}
          />
        </Tooltip>
      </Grid>
    </Grid>
  );
};

export default CallButtonSet;
