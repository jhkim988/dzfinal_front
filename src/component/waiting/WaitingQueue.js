import { useState, useEffect } from "react";
import { Box, Tab } from '@mui/material';
import { TabPanel, TabContext, TabList } from "@mui/lab";
import WaitingTabPanel from './WaitingTabPanel';

const tabInfo = [
  { label: "내원", value: "1", filter: (data) => data.state !== "수납완료" },
  { label: "진료", value: "2", filter: (data) => data.state === "진료대기" || data.state === "진료중" },
  { label: "수납", value: "3", filter: (data) => data.state === "수납대기" || data.state === "수납중" },
  { label: "완료", value: "4", filter: (data) => data.state === "수납완료" },
];

const WaitingQueue = () => {
  const [value, setValue] = useState("1");
  const [selected, setSelected] = useState(null);
  const [data, setData] = useState([]);

  const onRowClick = e => {
    setSelected(e.currentTarget.dataset.reception_id);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // init data load
  useEffect(() => {
    setData([
      { reception_id: 1, patient_id: 1, patient_name: "김진한", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "진료중" },
      { reception_id: 2, patient_id: 2, patient_name: "이진한", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "진료대기" },
      { reception_id: 3, patient_id: 3, patient_name: "박진한", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "진료대기" },
      { reception_id: 4, patient_id: 4, patient_name: "최진한", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "진료대기" },
      { reception_id: 5, patient_id: 5, patient_name: "남궁진한", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "진료대기" },
      { reception_id: 6, patient_id: 6, patient_name: "제갈진한", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "수납중" },
      { reception_id: 7, patient_id: 7, patient_name: "선우진한", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "수납대기" },
      { reception_id: 8, patient_id: 8, patient_name: "정진한", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "수납대기" },
      { reception_id: 9, patient_id: 9, patient_name: "백진한", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "수납대기" },
      { reception_id: 10, patient_id: 10, patient_name: "남궁진한", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "수납대기" },
      { reception_id: 11, patient_id: 11, patient_name: "김진한", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "수납완료" },
      { reception_id: 12, patient_id: 12, patient_name: "진한", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "수납완료" },
      { reception_id: 13, patient_id: 13, patient_name: "박진한", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "수납완료" },
      { reception_id: 14, patient_id: 14, patient_name: "진한", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "수납완료" },
      { reception_id: 15, patient_id: 15, patient_name: "남궁진한", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "수납완료" },
    ]);
  }, []);

  // mqtt listening
  useEffect(() => {
        
  }, []);

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
            <WaitingTabPanel data={data.filter(d => el.filter(d))} selected={selected} onRowClick={onRowClick}/>
          </TabPanel>)
        }
      </TabContext>
    </>
  );
};

export default WaitingQueue;
