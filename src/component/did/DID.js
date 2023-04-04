import { useRef, useEffect, useState, useCallback } from "react";
import DidSubscribe from "./DidSubscribe";
import DidVideo from "./DidVideo";
import DidWaiting from "./DidWaiting";
import { Grid, Paper } from "@mui/material";
import mqtt from "mqtt";

const DID = () => {
  const [data, setData] = useState([]);

  const client = useRef();
  useEffect(() => {
    // client.current = mqtt.connect("mqtt://192.168.0.132:8083/mqtt");
    client.current = mqtt.connect("mqtt://localhost:8083/mqtt");
  }, []);

  useEffect(() => {
    client.current.on("connect", () => {
      client.current.subscribe(`waiting`);
      client.current.on("message", mqttListener);
    });
  }, []);

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

  return (
    <div>
      <Grid
        container
        spacing={2}
        sx={{ justifyContent: "center", alignItems: "center" }}
      >
        <Grid item xs={7}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Paper
                elevation={3}
                sx={{
                  height: "69vh",
                  display: "flex",
                  justifyContent: "space-between",
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
                    height: "15vh",
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
