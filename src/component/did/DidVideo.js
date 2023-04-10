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
      {/* <h1>비디오 출력 부분</h1> */}
      비디오 이름: { getDidVideo.video_real_name }
      <video width="1436px" height="751px" autoplay loop controls>
        <source src="/api/view/getDidVideo" type="video/mp4" />
      </video>
      <br />
    </div>
  );
};

export default DidVideo;
