import React, { useState } from "react";
import Positions from "../tables/Positions";
import SectionButton from "../buttons/SectionButton";
import GroupLogo from "./GroupLogo";

const GroupModal = ({ group, setView, users, isAdminOfGroup }) => {
  return (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur justify-center items-center flex z-10 top-10 w-full m-2">
      <div className="fixed inset-0 bg-opacity-30 backdrop-blur justify-center items-center flex">
        <div className="h-[90%] overflow-y-scroll lg:w-[60%] sm:w-[80%] bg-black rounded-lg bg-opacity-70 relative">
          <GroupLogo photoURL={group.photoURL} name={group.name} />
          <div className="h-3/4 overflow-auto">
            <Positions
              users={users}
              global={false}
              isAdminOfGroup={isAdminOfGroup}
            />
          </div>
          <SectionButton
            text={"Return"}
            className={"absolute bottom-0 bg-[#303030] mb-4"}
            onClick={() => {
              setView("general");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default GroupModal;
