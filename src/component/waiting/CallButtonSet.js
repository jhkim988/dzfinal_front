
import { Grid, Button, Switch } from '@mui/material';
import { Tooltip } from '@mui/material';

const CallButtonSet = () => {
    return <Grid container spacing={2}>
        <Grid item xs={8}>
            <Button variant='contained' sx={{ width: '100% '}}>호출</Button>
        </Grid>
        <Grid item xs={2}>
            <Tooltip title="자동호출">
                <Switch/>
            </Tooltip>
        </Grid>
    </Grid>
}

export default CallButtonSet;