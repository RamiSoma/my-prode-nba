import React from "react";

const Input = ({
  state,
  resultTeam,
  onChange,
  status,
  user,
  className,
  unabled,
  placeholder,
}) => {
  const handleChange = (e) => {
    onChange(e, state);
  };
  return (
    <input
      type="number"
      id={state}
      value={status ? "" : resultTeam || ""}
      placeholder={placeholder ? placeholder : "4"}
      disabled={unabled && !user.isAdmin}
      className={` h-[40px] bg-transparent text-center w-[40px] rounded-lg ${className}`}
      onChange={handleChange}
    />
  );
};

export default Input;
