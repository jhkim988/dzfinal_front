import React, { useState, useEffect } from "react";
import axios from "axios";
import YouTube from "react-youtube";

const DidVideo = () => {
  const [getDidVideo, setGetDidVideo] = useState(null);

  const opts = {
    height: "740px",
    width: "1436px",
    playerVars: {
      autoplay: 1,
    },
  };

  const videoId = "UIV52pBSTN8"; // YouTube 비디오 ID


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

  useEffect(() => {
    if (getDidVideo) {
      console.log(getDidVideo.video_real_name);
    }
  }, [getDidVideo]);

  return (
    <div>
      {getDidVideo ? (
        <video width="1436px" height="740px" autoplay loop controls>
          <source src="/api/view/getDidVideo" type="video/mp4" />
        </video>
      ) : (
        <YouTube videoId={videoId} opts={opts} />
      )}
    </div>
  );
};

export default DidVideo;
