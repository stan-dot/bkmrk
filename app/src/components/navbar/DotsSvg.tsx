import React from "react";

export const DotsSvg = () => {
  // const SEARCH_BUTTON_EDGE = 180;
  // const iconEdge = Math.ceil(SEARCH_BUTTON_EDGE * 0.60);
  const searchIconStyle = {
    fill: '#727272',
  };
  return <svg
    version="1.1"
    x="0px"
    y="0px"
    width={12}
    height={49}
    viewBox="-10 -20 80 235"
    style={searchIconStyle}
  >
    <g>
      <path
        d="M15,0A15,15,0,1,1,0,15,15,15,0,0,1,15,0Zm0,92.93a15,15,0,1,1-15,15,15,15,0,0,1,15-15Zm0-46.47a15,15,0,1,1-15,15,15,15,0,0,1,15-15Z" />
    </g>
  </svg>;
};
