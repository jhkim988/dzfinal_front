import { useState } from 'react';
import mqtt from 'mqtt';

const MqttTest = () => {
    const options = {
        clean: true,
        connectTimeout: 4000,
        clientId: 'emqx_test',
        username: 'emqx_test',
        password: 'emqx_test',
      }
      const [messages, setMessage] = useState('');
      const client = mqtt.connect(`tcp://localhost:1883`, options);
      client.on('message', (topic, payload, packet) => {
        setMessage(messages.contat(payload.toString()))
      })
      const publish = () => {
        client.publish('test', 'Hello, mqtt');
      }
    return <>
        <button onClick={publish}>publish</button>
        <h1>${messages}</h1>
    </>
}

export default MqttTest;