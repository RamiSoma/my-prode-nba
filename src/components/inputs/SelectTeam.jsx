import React, { useEffect, useState } from "react";
import useTeams from "@/app/menu/playoff/newgame/useTeams";
import Loading from "../Loading";

const SelectTeam = ({
  gameKey,
  conference,
  handleChange,
  teamChange,
  disabled = false,
  teamDefault,
}) => {
  const [teams, isLoading, hasError] = useTeams();
  const [selectedTeam, setSelectedTeam] = useState();

  useEffect(() => {
    if (teamDefault && teams.some((team) => team.id == teamDefault)) {
      setSelectedTeam(teamDefault);
    }
  }, [teamDefault, teams]);

  return isLoading ? (
    <select className="bg-black bg-opacity-30 text-white p-2 rounded-lg m-2 w-3/4">
      <option>Loading...</option>
    </select>
  ) : hasError ? (
    <select className="bg-black bg-opacity-30 text-red-800 p-2 rounded-lg m-2 w-3/4">
      <option>
        <p>Error cargando equipos...</p>
      </option>
    </select>
  ) : (
    <select
      className="bg-black bg-opacity-30 text-white p-2 rounded-lg m-2 w-3/4"
      onChange={(event) => {
        handleChange(event, teamChange);
      }}
      disabled={disabled}
      value={selectedTeam}
    >
      {teams.map((team, index) =>
        gameKey === "FINALES NBA" ? (
          <option key={index} value={team.id}>
            {team.full_name}
          </option>
        ) : team.conference === conference ? (
          <option key={index} value={team.id}>
            {team.full_name}
          </option>
        ) : null
      )}
    </select>
  );
};

export default SelectTeam;
