import React from "react";

const Button = ({ text, onClick, className }) => {
  return (
    <button
      className={`rounded-[50px] w-full ${
        className ? className : "bg-princred p-4 px-8 hover:bg-princredhover"
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
