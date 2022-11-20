/* eslint-disable @next/next/no-img-element */
import React from "react";

const Loading = () => {
  return (
    <div className="loading-sence">
      <div className="running-circle">
        <img className="spin-back" src="/image/loading_pikachu.gif" alt="" />
      </div>
    </div>
  );
};

export default Loading;
