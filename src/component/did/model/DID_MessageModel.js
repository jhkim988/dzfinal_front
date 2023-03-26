import axios from 'axios';
import { useReducer } from 'react';

const DID_Message_ACTION = {
    INSERT: 1,
    APPEND: 2,
  };
  Object.freeze(DID_Message_ACTION);

function diseaseReducer(messages, action){
    switch(action.type){
      case DID_Message_ACTION.INSERT:
          return messages.concat(action.message);
      case DID_Message_ACTION.APPEND:
          return messages.concat(action.messages);
    case DID_Message_ACTION.RESET:
          return [];
      default:
        return messages;
    }
  }

export default function DID_MessageModel() {
    const [messages, dispatch] = useReducer(diseaseReducer, []);

    const onInsert = message => {
        axios.post("/api/did/did_subtitle", {
            message: message,
            active: 1
        })
        .then((response) => {
            dispatch({type: DID_Message_ACTION.INSERT, message: {id: response.data.id, message: message, active: true}});
        })
        .catch(error => {
            console.log(error);
        });
    }

    const onAppend = messageList => {
        dispatch({type : DID_Message_ACTION.APPEND, messages : messageList});
    }

    return [messages, onInsert, onAppend];
};