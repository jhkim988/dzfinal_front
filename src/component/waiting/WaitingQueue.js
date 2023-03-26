import { useState, useMemo } from "react";
import { Box, Tab } from '@mui/material';
import { TabPanel, TabContext, TabList } from "@mui/lab";
import WaitingTabPanel from './WaitingTabPanel';

const WaitingQueue = () => {
  const [value, setValue] = useState("1");

  const [selected, setSelected] = useState(null);
  
  const tabInfo = [
      { label: "내원", value: "1", filter: (data) => data.state !== "수납완료" },
      { label: "진료", value: "2", filter: (data) => data.state === "진료대기" || data.state === "진료중" },
      { label: "수납", value: "3", filter: (data) => data.state === "수납대기" || data.state === "수납중" },
      { label: "완료", value: "4", filter: (data) => data.state === "수납완료" },
    ];
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const data = [
    { reception_id: 1, patient_id: 1, patient_name: "김진한", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "진료중" },
    { reception_id: 2, patient_id: 2, patient_name: "김소연", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "진료대기" },
    { reception_id: 3, patient_id: 3, patient_name: "박진한", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "진료대기" },
    { reception_id: 4, patient_id: 4, patient_name: "박소연", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "진료대기" },
    { reception_id: 5, patient_id: 5, patient_name: "남궁진한", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "진료대기" },
    { reception_id: 6, patient_id: 6, patient_name: "김진한", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "수납중" },
    { reception_id: 7, patient_id: 7, patient_name: "김소연", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "수납대기" },
    { reception_id: 8, patient_id: 8, patient_name: "박진한", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "수납대기" },
    { reception_id: 9, patient_id: 9, patient_name: "박소연", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "수납대기" },
    { reception_id: 10, patient_id: 10, patient_name: "남궁진한", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "수납대기" },
    { reception_id: 11, patient_id: 11, patient_name: "김진한", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "수납완료" },
    { reception_id: 12, patient_id: 12, patient_name: "김소연", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "수납완료" },
    { reception_id: 13, patient_id: 13, patient_name: "박진한", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "수납완료" },
    { reception_id: 14, patient_id: 14, patient_name: "박소연", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "수납완료" },
    { reception_id: 15, patient_id: 15, patient_name: "남궁진한", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "수납완료" },
    { reception_id: 16, patient_id: 16, patient_name: "남궁진한", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "진료대기" },
    { reception_id: 17, patient_id: 17, patient_name: "남궁진한", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "진료대기" },
    { reception_id: 18, patient_id: 18, patient_name: "남궁진한", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "진료대기" },
    { reception_id: 19, patient_id: 19, patient_name: "남궁진한", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "진료대기" },
    { reception_id: 20, patient_id: 20, patient_name: "남궁진한", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "진료대기" },
    { reception_id: 21, patient_id: 21, patient_name: "남궁진한", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "진료대기" },
    { reception_id: 22, patient_id: 22, patient_name: "남궁진한", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "진료대기" },
    { reception_id: 23, patient_id: 23, patient_name: "남궁진한", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "진료대기" },
    { reception_id: 24, patient_id: 24, patient_name: "제갈진한", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "진료대기" }, 
    { reception_id: 25, patient_id: 25, patient_name: "남궁진한", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "진료대기" },
    { reception_id: 26, patient_id: 26, patient_name: "남궁진한", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "진료대기" },
    { reception_id: 27, patient_id: 27, patient_name: "남궁진한", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "진료대기" },
    { reception_id: 28, patient_id: 28, patient_name: "남궁진한", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "진료대기" },
    { reception_id: 29, patient_id: 29, patient_name: "남궁진한", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "진료대기" },
    { reception_id: 30, patient_id: 30, patient_name: "남궁진한", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "진료대기" },
    { reception_id: 31, patient_id: 31, patient_name: "남궁진한", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "진료대기" },

  ]

  return (
    <>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", minWidth: 260 }}>
          <TabList
            variant="fullWidth"
            sx={{ minWidth: 260 }}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            {tabInfo.map(el => <Tab sx={{ minWidth: 65 }} value={el.value} label={el.label} />)}
          </TabList>
        </Box>
        {
          tabInfo.map(el => <TabPanel sx={{ minWidth: 260, padding: 0 }} value={el.value}>
            <WaitingTabPanel data={data.filter(d => el.filter(d))}/>
          </TabPanel>)
        }
      </TabContext>
    </>
  );
};

export default WaitingQueue;
