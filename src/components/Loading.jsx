import React from "react";
import { InfinitySpin, LineWave } from "react-loader-spinner";
import Logo from "./Logo";

const Loading = ({ infinity, linewave }) => {
  return (
    <div className=" flex justify-center items-center overflow-hidden">
      {infinity ? (
        <InfinitySpin
          visible={true}
          width="200"
          color="#D24848"
          ariaLabel="infinity-spin-loading"
        />
      ) : linewave ? (
        <LineWave
          visible={true}
          height="100"
          width="100"
          color="#D24848"
          ariaLabel="line-wave-loading"
          wrapperStyle={{}}
          wrapperClass=""
          firstLineColor=""
          middleLineColor=""
          lastLineColor=""
        />
      ) : (
        <div className="top-0 overflow-hidden h-screen flex justify-center items-center">
          <Logo
            ball
            width={100}
            height={100}
            className="absolute w-[20%] animate-bounce"
          />
        </div>
      )}
    </div>
  );
};

export default Loading;
