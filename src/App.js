import { useState, useEffect } from 'react';
import mqtt from 'mqtt';

import Reception from './Reception';
import WaitingQueue from './WaitingQueue';

const host = `localhost`;
const port = `8083`;
const options = {
  clean: true,
  connectTimeout: 4000,
  clientId: `emqx_test${parseInt(Math.random()*10000)}`,
  username: `emqx_test${parseInt(Math.random()*10000)}`,
  password: "emqx_test",
  will: {
    topic: "test",
  },
};

const App = () => {
  const [client, setClient] = useState(null);
  const [data, setData] = useState({});
  const connect = () => {
    console.log(`connect`);
    setClient(mqtt.connect(`ws://${host}:${port}/mqtt`, options));
  }
  const listen = () => {
    client.on("message", (topic, payload, packet) => {
        setData({ topic, payload: payload.toString() });
    });
  }
  const subscribe = () => {
    client.subscribe(["waiting/inspection", "waiting/clinic", "waiting/treatment"], { qos: 2 });
  }
  return <>
  <button onClick={connect}>connect</button>
  <button onClick={subscribe}>subscribe</button>
  <button onClick={listen}>listen</button>
    <Reception client={client}/>
    <WaitingQueue queId={"waiting/inspection"} data={data}/>
    <WaitingQueue queId={"waiting/clinic"} data={data}/>
    <WaitingQueue queId={"waiting/treatment"} data={data}/>
    <WaitingQueue queId={"waiting/+"} data={data}/>
  </>
}

export default App;
