import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useContext,
} from "react";
import { Grid, Paper } from "@mui/material";
import axiosClient from "./../login/AxiosClient";
import CallButtonSet from "./CallButtonSet";
import WaitingQueue from "./WaitingQueue";
import { MqttContext } from "./MqttContextProvider";

const WaitingQueueLayout = ({
  initPanel,
  nextState,
  clickRowCallback,
  shouldAutoCall,
  findNextAutoCall,
  shouldDisableCallButton,
  onCall,
}) => {
  const client = useContext(MqttContext);
  const [data, setData] = useState([]);
  const selected = useRef();
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
  }, [data, findNextAutoCall]);

  // mqtt call Patient
  const callPatient = (reception_id) => {
    client.current.publish(
      "waiting",
      JSON.stringify({
        method: "PUT",
        data: { ...selected.current, reception_id, state: nextState },
      }),
      { qos: 1 }
    );
    onCall && onCall(nextState);
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
      if (selected.current && `${selected.current.reception_id}` === `${payload.data.reception_id}`) {
        selected.current = ({...selected.current, state: payload.data.state});
      }
      // autoCall
      if (autoCall.current && shouldAutoCall(payload)) {
        const next = autoCallNext.current;
        if (next) {
          selected.current = next;
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
  };

  const mqttEventListener = useCallback((topic, payload, packet) => {
    if (topic === "waiting") {
      payload = JSON.parse(payload);
      console.log("mqtt payload: ", payload);
      mqttWaitingController[payload.method](payload);
    }
  }, []);

  useEffect(() => {
    const clientCurrent = client.current;
    clientCurrent.subscribe("waiting", { qos: 1 });
    clientCurrent.on("message", mqttEventListener);
    // return () => {
    //   clientCurrent.unsubscribe("waiting");
    //   clientCurrent.removeListener("message", mqttEventListener);
    // }
  }, []);

  const onRowClick = (e) => {
    const selectData = data.find(
      (d) => `${d.reception_id}` === `${e.currentTarget.dataset.reception_id}`
    );
    selected.current = selectData;
    clickRowCallback && clickRowCallback(selectData);
  };

  useEffect(() => {
    axiosClient.get("/api/reception/today").then(({ data }) => {
      setData(data || []);
    });
  }, []);

  const disabledCallButton = !selected.current ? true : shouldDisableCallButton({ waitingData: data, selected: selected.current || { }});

  return (
    <Paper elevation={2} sx={{ height: "82vh" }}>
      <Grid container>
        <Grid item xs={12}>
          <CallButtonSet
            callPatient={callPatient}
            selected={selected.current}
            setAutoCall={setAutoCall}
            disabledCallButton={disabledCallButton}
            doctorFilter={doctorFilter}
            setDoctorFilter={setDoctorFilter}
          />
        </Grid>
        <Grid item xs={12} sx={{ height: "70vh" }}>
          <WaitingQueue
            data={data}
            selected={selected.current}
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
