import { useState } from 'react';

const Reception = ({ client }) => {
    const [input, setInput] = useState('');
    const onClick = e => {
        e.preventDefault();
        client.publish(`waiting/${e.target.name}`, JSON.stringify({ message: input }));
    }

    return (
        <>
            <input value={input} onChange={e => setInput(e.target.value)} />
            <button name="inspection" onClick={onClick}>검사실</button>
            <button name="clinic" onClick={onClick}>진료실</button>
            <button name="treatment" onClick={onClick}>처치실</button>
        </>
    )
}
export default Reception;