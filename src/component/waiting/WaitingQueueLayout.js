import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  useContext
} from "react";
import { Grid, Paper } from "@mui/material";
import axios from "axios";
import CallButtonSet from "./CallButtonSet";
import WaitingQueue from "./WaitingQueue";
import { MqttContext } from "./MqttContextProvider";

const WaitingQueueLayout = ({ initPanel, nextState, clickRowCallback, shouldAutoCall, findNextAutoCall, shouldDisableCallButton }) => {
  // const client = useRef();
  const client = useContext(MqttContext);

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
    setAutoCallNext(data.find(findNextAutoCall));
  }, [data]);

  // mqtt call Patient
  const callPatient = (reception_id) => {
    client.current.publish(
      "waiting",
      JSON.stringify({
        method: "PUT",
        data: { ...selected, reception_id, state: nextState },
      }),
      { qos: 1 }
    );
  };

  const mqttWaitingController = {
    ADD: (payload) => {
      setData((prev) => [...prev, payload.data]);
    },
    PUT: (payload) => {
      setData((prev) => {
        const ret = [...prev].map((d) =>
          `${d.reception_id}` === `${payload.data.reception_id}`
            ? { ...d, state: payload.data.state }
            : d
        );
        return [...ret];
      });
      // autoCall
      if (autoCall.current && shouldAutoCall(payload)) {
        const next = autoCallNext.current;
        if (next) {
          setSelected(`${next}`);
          clickRowCallback && clickRowCallback(next);
          callPatient(next.reception_id);  
        }
      }
    },
    DELETE: (payload) => {
      setData((prev) =>
        prev.filter((d) => d.reception_id !== payload.data.reception_id)
      );
    },
  }

  const mqttEventListener = useCallback((topic, payload, packet) => {
    payload = JSON.parse(payload);
    console.log("message", payload);
    if (topic === "waiting") {
      mqttWaitingController[payload.method](payload);
    }
  }, []);

  useEffect(() => {
    console.log("client", client);
    client.current.subscribe("waiting", { qos: 1 });
    client.current.on("message", mqttEventListener);
  }, []);

  const onRowClick = (e) => {
    const selectData = data.find(d => `${d.reception_id}` === `${e.currentTarget.dataset.reception_id}`);
    setSelected(selectData);
    clickRowCallback && clickRowCallback(selectData);
  };

  useEffect(() => {
    axios.get("/api/reception/today").then(({ data }) => {
      setData(data);
    });
  }, []);

  const disabledCallButton = useMemo(() => {
    if (!selected) return true;
    return shouldDisableCallButton(selected);
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
