import { Grid } from '@mui/material';
import DailyReservationList from './components/DailyReservationList';
import Reception from './components/Reception';
import ReceptionList from './components/ReceptionList';

function App() {
  return (
    <>
      <DailyReservationList />
      <Reception />
      <ReceptionList />
    </>
  );
}

export default App;
