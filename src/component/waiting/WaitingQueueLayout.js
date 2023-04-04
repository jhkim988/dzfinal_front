import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { Grid, Paper } from "@mui/material";
import mqtt from "mqtt";
import CallButtonSet from "./CallButtonSet";
import WaitingQueue from "./WaitingQueue";
import { axiosClient } from "../login/AxiosClient";
const mqttURL = `mqtt://192.168.0.132:8083/mqtt`;
// const mqttURL = `mqtt://localhost:8083/mqtt`;
const genRanHex = (size) =>
  [...Array(size)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");

const mqttOptions = {
  clean: true,
  connectTimeout: 30 * 1000,
  clientId: `React${genRanHex(6)}`,
  username: `React${genRanHex(6)}`,
  password: "emqx_test",
};

// TODO: doctor_id 적용
const autoCallInfo = {
  2: (d) => d.state === "진료대기",
  3: (d) => d.state === "수납대기",
};

const doctor_id = 1;

const WaitingQueueLayout = ({ initPanel, nextState, clickRowCallback }) => {
  const client = useRef();
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  const autoCall = useRef(false);
  const setAutoCall = (flag) => (autoCall.current = flag);
  const [doctorFilter, setDoctorFilter] = useState({
    1: true,
    2: true,
  });

  const autoCallNext = useRef();
  const setAutoCallNext = (next) => (autoCallNext.current = next);
  useEffect(() => {
    setAutoCallNext(data.find(autoCallInfo[initPanel]));
  }, [data]);

  // mqtt call Patient
  const callPatient = (reception_id) => {
    console.log("callPatient", reception_id);
    client.current.publish(
      "waiting",
      JSON.stringify({
        method: "PUT",
        data: { reception_id, state: nextState },
      }),
      { qos: 1 }
    );
  };

  const mqttEventListener = useCallback((topic, payload, packet) => {
    payload = JSON.parse(payload);
    console.log("message", payload);
    if (topic === "waiting") {
      if (payload.method === "ADD") {
        setData((prev) => [...prev, payload.data]);
      } else if (payload.method === "PUT") {
        setData((prev) => {
          const ret = [...prev].map((d) =>
            `${d.reception_id}` === `${payload.data.reception_id}`
              ? { ...d, state: payload.data.state }
              : d
          );
          return [...ret];
        });
        if (!autoCall.current) return;
        if (
          (initPanel === "2" && payload.data.state === "수납대기") ||
          (initPanel === "3" && payload.data.state === "수납완료")
        ) {
          const next = autoCallNext.current;
          setSelected(`${next.reception_id}`);
          clickRowCallback && clickRowCallback(next);
          callPatient(next.reception_id);
        }
      } else if (payload.method === "DELETE") {
        setData((prev) =>
          prev.filter((d) => d.reception_id !== payload.data.reception_id)
        );
      } else {
        throw new Error("Unsupported Operation");
      }
    }
  }, []);

  useEffect(() => {
    console.log("client init");
    client.current = mqtt.connect(mqttURL, mqttOptions);
    client.current.subscribe("waiting", { qos: 1 });
    client.current.on("message", mqttEventListener);
  }, []);

  const onRowClick = (e) => {
    setSelected(e.currentTarget.dataset.reception_id);
    console.log(
      data.filter(
        (el) => `${el.reception_id}` === e.currentTarget.dataset.reception_id
      )[0]
    );
    clickRowCallback &&
      clickRowCallback(
        data.filter(
          (el) => `${el.reception_id}` === e.currentTarget.dataset.reception_id
        )[0]
      );
  };

  useEffect(() => {
    axiosClient.get("/api/reception/today").then(({ data }) => {
      setData(data);
    });
  }, []);

  const disabledCallButton = useMemo(() => {
    const selectData = data.find((d) => `${d.reception_id}` === `${selected}`);
    if (!selectData) return true;
    return (
      (initPanel === "3" && selectData.state !== "수납대기") ||
      (initPanel === "2" && selectData.state !== "진료대기") ||
      (initPanel === "2" && selectData.doctor_id !== doctor_id)
    );
  }, [data, selected]);

  return (
    <Paper elevation={2} sx={{ height: "82vh" }}>
      <Grid container>
        <Grid item xs={12}>
          <CallButtonSet
            callPatient={callPatient}
            selected={selected}
            setAutoCall={setAutoCall}
            disabledCallButton={disabledCallButton}
            doctorFilter={doctorFilter}
            setDoctorFilter={setDoctorFilter}
          />
        </Grid>
        <Grid item xs={12} sx={{ height: "70vh" }}>
          <WaitingQueue
            data={data}
            selected={selected}
            onRowClick={onRowClick}
            initPanel={initPanel}
            autoCall={autoCall}
            doctorFilter={doctorFilter}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default WaitingQueueLayout;
