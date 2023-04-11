import { useReducer, useState } from "react";
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
    axiosClient
      .post("/api/did/did_video", video, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        dispatch({
          type: DID_Video_ACTION.INSERT,
          video: {
            id: response.data,
            video_name: video.get("file").name,
            active: false,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onToggle = (id, active) => {
    if (active === true) {
      axiosClient
        .put("/api/did/did_video", {
          id: id,
          active: !active,
        })
        .then((response) => {
          if (response.data === true) {
            dispatch({
              type: DID_Video_ACTION.TOGGLE,
              id: id,
              active: !active,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (active === false) {
      const count = videos.filter((video) => video.active).length;

      if (count === 0) {
        axiosClient
          .put("/api/did/did_video", {
            id: id,
            active: !active,
          })
          .then((response) => {
            if (response.data === true) {
              dispatch({
                type: DID_Video_ACTION.TOGGLE,
                id: id,
                active: !active,
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        alert("한개만 체크해주세요");
        return;
      }
    }
  };

  const onDelete = (id) => {
    axiosClient
      .delete("/api/did/did_video", { params: { id: id } })
      .then((response) => {
        dispatch({ type: DID_Video_ACTION.DELETE, id });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onAppend = (videoList) => {
    dispatch({ type: DID_Video_ACTION.APPEND, videos: videoList });
  };

  return [videos, onInsert, onToggle, onDelete, onAppend];
}
