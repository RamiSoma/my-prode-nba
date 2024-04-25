import React from "react";

const SectionButton = ({ text, onClick, bold, className }) => {
  return (
    <button
      onClick={() => {
        onClick();
      }}
      className={`button-gray ${className} ${
        bold ? "font-bold bg-[#303030]" : ""
      } `}
    >
      {text}
    </button>
  );
};

export default SectionButton;
