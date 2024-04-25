import React from "react";

const SaveButton = ({ onClick, text, state, disabled = false, className }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={
        className
          ? className
          : ` overflow-hidden h-8 mt-4 rounded-[10px] border border-slate-300 hover:border-slate-400 ease-in duration-200 ${
              state
                ? "bg-[#3c5e18] rounded-full h-8 w-8"
                : "bg-[#026ed2] hover:bg-[#152636] hover:font-bold w-full"
            } `
      }
    >
      {state ? "✓" : `${text}`}
    </button>
  );
};

export default SaveButton;
