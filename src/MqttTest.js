import { useState, useEffect } from "react";
import mqtt from "mqtt";

const MqttTest = () => {
  const options = {
    clean: true,
    connectTimeout: 4000,
    clientId: `emqx_test${Math.random()}`,
    username: `emqx_test${Math.random()}`,
    password: "emqx_test",
    will: {
      topic: "test",
    },
  };
  const [input, setInput] = useState("");
  const [client, setClient] = useState(
    mqtt.connect(`ws://192.168.0.132:8083/mqtt`, options)
  );
  const [messages, setMessage] = useState("");
  const publish = (val) => {
    client.publish("test", val);
  };
  useEffect(() => {
    client.on("message", (topic, payload, packet) => {
      setMessage((prev) => payload.toString());
    });
  }, [client]);
  client.subscribe("test");

  return (
    <>
      <input onChange={(e) => setInput(e.target.value)} value={input} />
      <button onClick={() => publish(input)}>publish</button>
      <h1>${messages}</h1>
    </>
  );
};

export default MqttTest;
