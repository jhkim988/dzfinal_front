import { useState, useEffect } from "react";
import { Box, Tab } from '@mui/material';
import { TableContainer } from '@mui/material';
import { TabPanel, TabContext, TabList } from "@mui/lab";
import WaitingTabPanel from './WaitingTabPanel';


const tabInfo = [
  { label: "내원", value: "1", filter: (data) => data.state !== "수납완료" },
  { label: "진료", value: "2", filter: (data) => data.state === "진료대기" || data.state === "진료중" },
  { label: "수납", value: "3", filter: (data) => data.state === "수납대기" || data.state === "수납중" },
  { label: "완료", value: "4", filter: (data) => data.state === "수납완료" },
];

const WaitingQueue = ({ initPanel, data, selected, onRowClick, doctorFilter }) => {
  const [value, setValue] = useState(initPanel);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            variant="fullWidth"
            sx={{ minWidth: 260 }}
            onChange={handleChange}
          >
            {tabInfo.map((el, idx) => <Tab key={`Tab${idx}`}sx={{ minWidth: 65 }} value={el.value} label={el.label} />)}
          </TabList>
        </Box>
        {
          tabInfo.map((el, idx) => <TabPanel
              key={`TabPanel${idx}`}
              sx={{ minWidth: 260, padding: 0 }}
              value={el.value}
            >
            <WaitingTabPanel
              data={data.filter(d => el.filter(d) && doctorFilter[d.doctor_id])}
              selected={selected}
              onRowClick={onRowClick}
            />
          </TabPanel>)
        }
      </TabContext>
    </>
  );
};

export default WaitingQueue;
