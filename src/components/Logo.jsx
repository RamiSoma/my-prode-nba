import React from "react";

const Logo = ({ width, height, className, ball = false }) => {
  return (
    <img
      alt="Strategy"
      src={ball ? "/ball-of-basketball.png" : "/strategy.png"}
      className={`${ball ? "w-1/2 h-auto" : ""} ${className}`}
      width={width}
      height={height}
    />
  );
};

export default Logo;
