import { Paper } from '@mui/material';
import { Box } from '@mui/system';
import AutoCompleteForm from './components/AutoCompleteForm';
import DailyReservationList from './components/DailyReservationList';
import ReceptionForm from './components/ReceptionForm';
import ReceptionList from './components/ReceptionList';

function App() {
  return (
    <div style={{ width: "900px", height: "200px" }}>
      <AutoCompleteForm />
      <Paper>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <DailyReservationList />
          <ReceptionForm />
        </Box>
      </Paper>
      {/* <ReceptionList /> */}
    </div>
  );
}

export default App;
