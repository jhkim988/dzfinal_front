import { useRef, useEffect, useState, useCallback, useContext } from "react";
import DidSubscribe from "./DidSubscribe";
import DidVideo from "./DidVideo";
import DidWaiting from "./DidWaiting";
import { Grid, Paper } from "@mui/material";
import mqtt from "mqtt";
import { MqttContext } from "../waiting/MqttContextProvider";
import Clinic1 from "./Clinic1";
import Clinic2 from "./Clinic2";
import Receipt from "./Receipt";
import axiosClient from "../login/AxiosClient"

// TODO: doctor_id 적용
const autoCallInfo = {
  2: (data) => data.state === "진료대기",
  3: (data) => data.state === "수납대기",
}

const doctor_id = 1;

const BigDID = ({ nextState }) => {
  const client = useContext(MqttContext);
  const [data, setData] = useState([]);

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
    client.current.subscribe(`waiting`, { qos: 1 });
    client.current.on("message", mqttListener);
    return () => {
      // client.current.unsubscribe(`waiting`);
      // client.current.removeEvent(mqttListener);
    }
  }, []);

  useEffect(() => {
    axiosClient.get("/api/reception/today", {
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
          sx={{ justifyContent: "center", alignContent: "center" }}>
            <Grid item xs={4}>
                <Paper 
                  elevation={3} 
                  sx={{ 
                    height: "98vh",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                    }}
                >
                    <Clinic1 />
                </Paper>
            </Grid>

            <Grid item xs={4}>
                <Paper 
                  elevation={3} 
                  sx={{ 
                    height: "98vh",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                    }}
                >
                    2 진료실
                </Paper>
            </Grid>

            <Grid item xs={4}>
                <Paper 
                  elevation={3} 
                  sx={{ 
                    height: "98vh",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                    }}
                >
                    수납
                </Paper>
            </Grid>
        </Grid>
    </div>
  );
};

export default BigDID;
