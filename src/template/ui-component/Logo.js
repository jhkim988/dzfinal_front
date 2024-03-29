import React from "react";

const Logo = () => {
  return (
    // <svg width="92" height="32" viewBox="0 0 92 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    //  </svg>
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="66px"
      height="32px"
      viewBox="0 0 66 32"
      enableBackground="new 0 0 66 32"
    >
      <image
        id="image0"
        width="66"
        height="32"
        x="0"
        y="0"
        href="data:image/png;base64,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"
      />
    </svg>
  );
};

export default Logo;
