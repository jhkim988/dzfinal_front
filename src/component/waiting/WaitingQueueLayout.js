import { useState, useEffect, useCallback, useMemo } from "react";
import { Grid, Paper } from "@mui/material";
import mqtt from "mqtt";
import axios from "axios";
import CallButtonSet from "./CallButtonSet";
import WaitingQueue from "./WaitingQueue";

// const mqttURL = `mqtt://192.168.0.132:8083/mqtt`;
const mqttURL = `mqtt://localhost:8083/mqtt`;
const genRanHex = (size) =>
  [...Array(size)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");

const mqttOptions = {
  clean: true,
  connectTimeout: 30 * 1000,
  clientId: `emqx_test${genRanHex(6)}`,
  username: `emqx_test${genRanHex(6)}`,
  password: "emqx_test",
};

const autoCallInfo = {
  "1": d => d.state === "진료대기",
  "2": d => d.state === "수납대기"
}

const doctor_id = 1;

const WaitingQueueLayout = ({ initPanel, nextState, clickRowCallback }) => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [autoCall, setAutoCall] = useState(false);
  const [doctorFilter, setDoctorFilter] = useState({
    1: true,
    2: true,
  });
  
  const client = useMemo(() => mqtt.connect(mqttURL, mqttOptions), []);

  // client connect
  useEffect(() => {
    client.on("connect", () => {
      client.subscribe("waiting", { qos: 1 });
    });
    return () => {
      client.end();
    };
  }, []);

  const mqttEventListener = useCallback((topic, payload, packet) => {
    payload = JSON.parse(payload);
    console.log("message", payload);

    if (topic === "waiting") {
      if (payload.method === "ADD") {
        setData(prev => [...prev, payload.data]);
      } else if (payload.method === "PUT") {
        setData((prev) => {
          const ret = [...prev].map((d) =>
            `${d.reception_id}` === `${payload.data.reception_id}`
              ? { ...d, state: payload.data.state }
              : d
          );
          return [...ret];
        });
        callPatient(data.find(autoCallInfo[initPanel]).reception_id)
      } else if (payload.method === "DELETE") {
        setData((prev) =>
          prev.filter((d) => d.reception_id !== payload.data.reception_id)
        );
      } else {
        throw new Error("Unsupported Operation");
      }
    }
  }, [autoCall]);

  useEffect(() => {
    client.on("message", mqttEventListener);
    return () => {
      client.removeListener("message", mqttEventListener);
    }
  }, [client, mqttEventListener]);

  // mqtt call Patient
  const callPatient = useCallback(
    (reception_id) => {
      client.publish(
        "waiting",
        JSON.stringify({
          method: "PUT",
          data: { reception_id, state: nextState },
        })
      );
    },
    [client]
  );

  const onRowClick = (e) => {
    setSelected(e.currentTarget.dataset.reception_id);
    clickRowCallback &&
      clickRowCallback(
        data.filter(
          (el) => `${el.reception_id}` === e.currentTarget.dataset.reception_id
        )[0]
      );
  };
  
  useEffect(() => {
    axios.get("/api/reception/today").then(({ data }) => {
      setData(data);
    });
  }, []);

  const disabled = useMemo(() => {
    const select = data.find(d => `${d.reception_id}` === `${selected}`);
    console.log(select);
    return select && `${data.find(d => `${d.reception_id}` === `${selected}`).doctor_id}` !== `${doctor_id}`;
  }, [data, selected]);

  return (
    <Paper>
      <Grid container>
        <Grid item xs={12}>
          <CallButtonSet
            callPatient={callPatient}
            selected={selected}
            autoCall={autoCall}
            setAutoCall={setAutoCall}
            disabled={disabled}
            doctorFilter={doctorFilter}
            setDoctorFilter={setDoctorFilter}
          />
        </Grid>
        <Grid item xs={12}>
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
