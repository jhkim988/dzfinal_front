import Paper  from '@mui/material/Paper';
import { Button } from '@mui/material';
import { Scheduler, WeekView, Appointments } from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState } from '@devexpress/dx-react-scheduler';


const ReservationWeek = () => {
    const appointments = [];
    const viewDate = new Date();
    
    const minusWeek = () => {

    }

    const plusWeek = () => {

    }

    return (
        <>
          <Paper>
            <Scheduler data={appointments}>
              <ViewState currentDate={viewDate} />
              <Button onClick={minusWeek}>prev</Button>
              <Button onClick={plusWeek}>next</Button>
              <WeekView startDayHour={9} endDayHour={18} cellDuration={60}/>
              <Appointments/>
            </Scheduler>
          </Paper>
        </>
      );
}

export default ReservationWeek;