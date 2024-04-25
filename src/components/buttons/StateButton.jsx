import React from "react";

const StateButton = ({ className, stateToUpdate, src, handleClick, alt }) => {
  return (
    <button
      className={`h-12 w-12 p-3 rounded-full mt-5 bg-[#162927] border border-slate-700 hover:border-slate-800 ${className} ${
        status === stateToUpdate ? "bg-[#0c1615]" : ""
      }`}
      onClick={(e) => {
        handleClick(e, stateToUpdate);
      }}
    >
      <div style={{ filter: "brightness(0) invert(1)" }}>
        <img src={src} alt={alt} />
      </div>
    </button>
  );
};

export default StateButton;
