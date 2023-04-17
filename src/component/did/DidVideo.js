import React, { useState, useEffect } from "react";
// import axios from "axios";
import axiosClient from "../login/AxiosClient";
import { Grid, Paper } from "@mui/material";

const DidVideo = () => {
  const [getDidVideo, setGetDidVideo] = useState(null);

  const noVideo = "설정한 비디오가 존재하지 않습니다!"

  useEffect(() => {
    // axios
    axiosClient
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
<div alignItems="center">
  {getDidVideo ? (
    <video width="100%" height="735px" autoPlay loop controls alignItems="center">
      <source src="/api/view/getDidVideo" type="video/mp4" />
    </video>
  ) : (
    <Paper
      elevation={3}
      sx={{
        height: "83vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ fontWeight: "bold", fontSize: "80px", textAlign: "center", color: "#ff3d00" }}>
        {noVideo}
      </div>
    </Paper>
  )}
</div>
  );
};

export default DidVideo;
