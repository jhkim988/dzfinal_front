import { useState, useEffect, useCallback } from "react";
import { Grid } from "@mui/material";
import mqtt from "mqtt";
import axios from "axios";
import CallButtonSet from "./CallButtonSet";
import WaitingQueue from "./WaitingQueue";

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

const WaitingQueueLayout = ({ initPanel, nextState, clickRowCallback }) => {
  const [data, setData] = useState([]);
  const [client, setClient] = useState(
    mqtt.connect(`mqtt://localhost:8083/mqtt`, mqttOptions)
  );
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    client.on("connect", () => {
      client.subscribe("waiting", { qos: 1 });
    });

    client.on("message", (topic, payload, packet) => {
      payload = JSON.parse(payload);
      console.log("message", payload);

      if (topic === "waiting") {
        if (payload.method === "ADD") {
          setData([...data, payload.data]);
        } else if (payload.method === "PUT") {
          setData((prev) => {
            const ret = [...prev].map((d) =>
              `${d.reception_id}` === payload.data.reception_id
                ? { ...d, ...payload.data }
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
    });

    return () => {
      client.end();
    };
  }, []);

  // mqtt call Patient
  const callPatient = useCallback(
    (reception_id) => {
      console.log("publish: waiting");
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

  // 진료 대기 -> 진료 중 -> 진료 완료 -> 수납 대기 -> 수납 중 -> 수납완료
  // 1. waiting (subscribe: 대기열 추가(Java 에서), publish: 대기열 제거)
  // 2. Java (subscribe: 대기상태 변화 로그 기록, publish: 진료완료, 수납완료 시)
  // 3. DID (subscribe: 대기열 추가(Java)/제거(waiting))

  const onRowClick = (e) => {
    setSelected(e.currentTarget.dataset.reception_id);
    clickRowCallback &&
      clickRowCallback(
        data.filter(
          (el) => `${el.reception_id}` === e.currentTarget.dataset.reception_id
        )[0]
      );
  };
  // init data load
  useEffect(() => {
    // setData([
    //   { reception_id: '1', patient_id: '1', patient_name: "김진한", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "진료중" },
    //   { reception_id: '2', patient_id: '2', patient_name: "이진한", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "진료대기" },
    //   { reception_id: '3', patient_id: '3', patient_name: "박진한", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "진료대기" },
    //   { reception_id: '4', patient_id: '4', patient_name: "최진한", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "진료대기" },
    //   { reception_id: '5', patient_id: '5', patient_name: "남궁진한", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "진료대기" },
    //   { reception_id: '6', patient_id: '6', patient_name: "제갈진한", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "수납중" },
    //   { reception_id: '7', patient_id: '7', patient_name: "선우진한", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "수납대기" },
    //   { reception_id: '8', patient_id: '8', patient_name: "정진한", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "수납대기" },
    //   { reception_id: '9', patient_id: '9', patient_name: "백진한", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "수납대기" },
    //   { reception_id: '10', patient_id: '10', patient_name: "남궁진한", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "수납대기" },
    //   { reception_id: '11', patient_id: '11', patient_name: "김진한", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "수납완료" },
    //   { reception_id: '12', patient_id: '12', patient_name: "진한", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "수납완료" },
    //   { reception_id: '13', patient_id: '13', patient_name: "박진한", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "수납완료" },
    //   { reception_id: '14', patient_id: '14', patient_name: "진한", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "수납완료" },
    //   { reception_id: '15', patient_id: '15', patient_name: "남궁진한", front_registration_number: "961119", doctor_id: "1", doctor_name: "김더존", state: "수납완료" },
    // ]);
    axios.get("/api/reception/today").then(({ data }) => {
      setData(data);
    });
  }, []);
  return (
    <Grid container>
      <Grid item xs={12}>
        <CallButtonSet callPatient={callPatient} selected={selected} />
      </Grid>
      <Grid item xs={12}>
        <WaitingQueue
          data={data}
          selected={selected}
          onRowClick={onRowClick}
          initPanel={initPanel}
        />
      </Grid>
    </Grid>
  );
};

export default WaitingQueueLayout;
