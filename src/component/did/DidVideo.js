import React, { useState, useEffect } from "react";
import axios from "axios";

const DidVideo = () => {
  const [getDidVideo, setGetDidVideo] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/view/getDidVideo`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setGetDidVideo(response.data);
      });
  }, []);

  return (
    <div>
      <h1>비디오 출력 부분</h1>
      {getDidVideo.type}
      <br />
      {getDidVideo.video}
      <br />
      {getDidVideo.real_name}
      <br />
    </div>
  );
};

export default DidVideo;
