import React from "react";

const PlayoffSection = ({
  playoffKey,
  onClick,
  bold,
  stateToUpdate = "key",
}) => {
  return (
    <button
      value={playoffKey}
      onClick={(e) => {
        onClick(e, stateToUpdate);
      }}
      className={`button-gray ${bold ? "font-bold bg-[#303030]" : ""}`}
    >
      {playoffKey}
    </button>
  );
};

export default PlayoffSection;
