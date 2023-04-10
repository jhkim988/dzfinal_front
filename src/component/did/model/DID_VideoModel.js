import { useReducer } from "react";
import axiosClient from "./../../login/AxiosClient";

const DID_Video_ACTION = {
  INSERT: 1,
  TOGGLE: 2,
  DELETE: 3,
  APPEND: 4,
};
Object.freeze(DID_Video_ACTION);

function didVideoReducer(videos, action) {
  switch (action.type) {
    case DID_Video_ACTION.INSERT:
      return videos.concat(action.video);
    case DID_Video_ACTION.TOGGLE:
      return videos.map((video) =>
        video.id === action.id ? { ...video, active: !video.active } : video
      );
    case DID_Video_ACTION.DELETE:
      return videos.filter((video) => video.id !== action.id);
    case DID_Video_ACTION.APPEND:
      return videos.concat(action.videos);
    default:
      return videos;
  }
}

export default function DID_VideoModel() {
  const [videos, dispatch] = useReducer(didVideoReducer, []);

  const onInsert = (video) => {
    // axiosClient
    //   .post("/api/did/did_subtitle", {
    //     message: message,
    //     active: 1,
    //   })
    //   .then((response) => {
    //     dispatch({
    //       type: DID_Video_ACTION.INSERT,
    //       message: { id: response.data, message: message, active: true },
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  const onToggle = (id, active) => {
    // axiosClient
    //   .put("/api/did/did_subtitle", {
    //     id: id,
    //     active: !active,
    //   })
    //   .then((response) => {
    //     if (response.data === true) {
    //       dispatch({
    //         type: DID_Video_ACTION.TOGGLE,
    //         id: id,
    //         active: !active,
    //       });
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  const onDelete = (id) => {
    // axiosClient
    //   .delete("/api/did/did_subtitle", { params: { id: id } })
    //   .then((response) => {
    //     dispatch({ type: DID_Video_ACTION.DELETE, id });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  const onAppend = (videoList) => {
    dispatch({ type: DID_Video_ACTION.APPEND, videos: videoList });
  };

  return [videos, onInsert, onToggle, onDelete, onAppend];
}
