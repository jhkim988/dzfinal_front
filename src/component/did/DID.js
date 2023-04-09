import { useRef, useEffect, useState, useCallback } from "react";
import DidSubscribe from "./DidSubscribe";
import DidVideo from "./DidVideo";
import DidWaiting from "./DidWaiting";
import { Grid, Paper } from "@mui/material";
import axios from "axios";
import mqtt from "mqtt";


// const mqttURL = `mqtt://192.168.0.132:8083/mqtt`;
const mqttURL = `mqtt://localhost:8083/mqtt`;

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
  2: (data) => data.state === "진료대기",
  3: (data) => data.state === "수납대기",
}

const doctor_id = 1;


const DID = ({ nextState }) => {
  const client = useRef();
  const [data, setData] = useState([]);
  const autoCall = useRef(false);
  const setAutoCall = (flag) => (autoCall.current = flag);
  const [doctorFilter, setDoctorFilter] = useState({
    1: true,
    2: true,
  });


  const autoCallNext = useRef();
  // const setAutoCallNext = (next) => (autoCallNext.current = next);
  // useEffect(() => {
  //   setAutoCallNext(data.find(autoCallInfo[initPanel]));
  // }, [data]);

  const callPatient = (reception_id) => {
    console.log("callPatient", reception_id);
    client.current.publish(
      "waiting",
      JSON.stringify({
        method: "PUT",
        data: { reception_id, state: nextState },
      }),
      { qos : 1 }
    )
  }

  // { method: "ADD | PUT | DELETE", data: { reception_id, ... }}
  const mqttListener = useCallback((topic, payload, packet) => {
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
    client.current.subscribe(`waiting`, { qos: 1 });
    client.current.on("message", mqttListener);
  }, []);

  useEffect(() => {
    axios.get("/api/reception/today", {
      headers: {
        "Content-Type": "application/json",
      }
    }).then(({ data }) => {
      setData(data);
    });
  }, []);



  return (
    <div>
      <Grid
        container
        spacing={2}
        sx={{ justifyContent: "center", alignItems: "center" }}
      >
        <Grid item xs={9}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Paper
                elevation={3}
                sx={{
                  height: "79vh",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <DidVideo />
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Grid
                item
                xs={12}
                sx={{ justifyContent: "center", alignItems: "center" }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    height: "19vh",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0.16px",
                  }}
                >
                  <DidSubscribe />
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={3}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <DidWaiting 
                data={data}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default DID;
