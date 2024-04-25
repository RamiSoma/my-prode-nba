import Image from "next/image";
import React, { useState } from "react";
import Loading from "../Loading";

const Team = ({ team, predTeam, status, loading, onChange }) => {
  const [pred, setpred] = useState(predTeam);

  return loading ? (
    <Loading infinity={false} />
  ) : (
    <div className="relative flex flex-col items-center">
      <Image
        width={104}
        height={104}
        src={`/logo_teams/${team.abbreviation}.svg`}
        className="l-1/2"
        priority
        alt="team"
      />

      <p className="hidden lg:block font-bold text-22">{team.full_name}</p>
      <p className="lg:hidden font-bold text-22">{team.abbreviation}</p>
      <input
        type="number"
        id="predict_team"
        value={loading ? "" : pred || ""}
        placeholder="..."
        className=" l-1/2 w-1/4 bg-transparent border-solid border-b-2 my-4 py-4  hover:bg-[#1d3532] text-center"
        disabled={status === "editable" ? false : true}
        onChange={(e) => {
          setpred(e.target.value);
          onChange(e.target.value);
        }}
      />
    </div>
  );
};

export default Team;
