import { useReducer } from "react";
import axiosClient from './../../login/AxiosClient';

const DID_Message_ACTION = {
  INSERT: 1,
  TOGGLE: 2,
  UPDATE: 3,
  DELETE: 4,
  APPEND: 5,
};
Object.freeze(DID_Message_ACTION);

function didMessageReducer(messages, action) {
  switch (action.type) {
    case DID_Message_ACTION.INSERT:
      return messages.concat(action.message);
    case DID_Message_ACTION.TOGGLE:
      return messages.map((message) =>
        message.id === action.id
          ? { ...message, active: !message.active }
          : message
      );
    case DID_Message_ACTION.UPDATE:
      const updatedMessages = {
        [action.id]: { id: action.id, message: action.updatedMessage },
      };
      return messages.map((message) => {
        const updatedMessage = updatedMessages[message.id];
        if (updatedMessage) {
          return { ...message, ...updatedMessage };
        }
        return message;
      });
    case DID_Message_ACTION.DELETE:
      return messages.filter((message) => message.id !== action.id);
    case DID_Message_ACTION.APPEND:
      return messages.concat(action.messages);
    default:
      return messages;
  }
}

export default function DID_MessageModel() {
  const [messages, dispatch] = useReducer(didMessageReducer, []);

  const onInsert = (message) => {
    axiosClient
      .post("/api/did/did_subtitle", {
        message: message,
        active: 1,
      })
      .then((response) => {
        dispatch({
          type: DID_Message_ACTION.INSERT,
          message: { id: response.data, message: message, active: true },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onToggle = (id, active) => {
    axiosClient
      .put("/api/did/did_subtitle", {
        id: id,
        active: !active,
      })
      .then((response) => {
        if (response.data === true) {
          dispatch({
            type: DID_Message_ACTION.TOGGLE,
            id: id,
            active: !active,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onUpdate = (id, updatedMessage) => {
    axiosClient
      .put("/api/did/updatemessage", {
        id: id,
        message: updatedMessage,
      })
      .then((response) => {
        dispatch({ type: DID_Message_ACTION.UPDATE, id, updatedMessage });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onDelete = (id) => {
    axios
      .delete("/api/did/did_subtitle", { params: { id: id } })
      .then((response) => {
        dispatch({ type: DID_Message_ACTION.DELETE, id });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onAppend = (messageList) => {
    dispatch({ type: DID_Message_ACTION.APPEND, messages: messageList });
  };

  return [messages, onInsert, onToggle, onUpdate, onDelete, onAppend];
}
