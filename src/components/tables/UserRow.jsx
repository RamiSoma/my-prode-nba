"use client";
import React, { useEffect, useState } from "react";

const UserRow = ({
  username,
  photoURL,
  position,
  points,
  global,
  isAdminOfGroup,
}) => {
  const [viewOptions, setViewOptions] = useState();

  useEffect(() => {
    setViewOptions(false);
  }, []);

  return (
    <tr className="relative group">
      <td className="text-center">{position + 1}.</td>
      {global ? null : (
        <td className="text-center">
          <img
            className="mx-auto h-10 w-10 min-h-7 min-w-7 object-cover object-center rounded-full"
            src={photoURL}
            alt={"..."}
          />
        </td>
      )}
      <td className="text-center text-sm">{username}</td>
      <td className="text-center">{points}</td>
      <td className="text-center">
        <button
          className="w-full text-[#717070] rounded-full"
          onClick={() => setViewOptions(!viewOptions)}
        >
          ...
        </button>
        {viewOptions ? (
          <div className="absolute inset-0 gap-2 justify-center items-center flex transition-all duration-1000 ease-in-out bg-opacity-80 backdrop-blur bg-[#494949] rounded-lg">
            <div className="bg-[#1b5c6c] text-white p-2 rounded-lg transition-opacity duration-700 ease-in-out cursor-pointer">
              View Profile
            </div>

            {isAdminOfGroup
              ? /*<div className="bg-red-500 text-white p-2 rounded-lg duration-700 ease-in-out cursor-pointer">
                Delete
              </div>*/ null
              : null}
            <button
              className="w-10"
              onClick={() => setViewOptions(!viewOptions)}
            >
              Return
            </button>
          </div>
        ) : null}
      </td>
    </tr>
  );
};

export default UserRow;
