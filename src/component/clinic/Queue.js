import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import React, { useState } from 'react';
import TabTable from './TabTable';

// yarn add @mui/lab

const Queue = () => {
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [status, setStatus] = useState([]);

    return (
        <div>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="전체" value="1" />
                            <Tab label="진료" value="2" />
                            <Tab label="수납" value="3" />
                        </TabList>
                    </Box>
                    <TabPanel value="1" sx={{padding: 0}}><TabTable/></TabPanel>
                    <TabPanel value="2" sx={{padding: 0}}>진료</TabPanel>
                    <TabPanel value="3" sx={{padding: 0}}>수납</TabPanel>
                </TabContext>
            </Box>
        </div>
    );
};

export default Queue;