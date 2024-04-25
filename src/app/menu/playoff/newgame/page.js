"use client";

import { useRouter } from "next/navigation";
import useTeams from "./useTeams";
import { guardarPartido } from "@/api/database";
import { useState } from "react";
import SelectTeam from "@/components/inputs/SelectTeam";
import SaveButton from "@/components/buttons/SaveButton";

const newGame = () => {
  const router = useRouter();
  var [teams, isLoading, hasError] = useTeams();
  const [conference, setConference] = useState("East"); //'East','West'
  const [key, setKey] = useState("PLAY-IN");
  const [team1, setTeam1] = useState();
  const [team2, setTeam2] = useState();
  const [guardadoExitoso, setGuardadoExitoso] = useState(false);

  async function agregarPartido(e) {
    e.preventDefault();
    try {
      await guardarPartido(team1, team2, key, conference);
      setGuardadoExitoso(true);

      setTimeout(() => {
        setGuardadoExitoso(false);
      }, 1800);
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(event, stateToUpdate) {
    // Usa el nombre del estado (stateToUpdate) para decidir qué estado actualizar.
    switch (stateToUpdate) {
      case "conference":
        setConference(event.target.value);
        break;
      case "key":
        setKey(event.target.value);
        break;
      case "team1":
        setTeam1(event.target.value);
        break;
      case "team2":
        setTeam2(event.target.value);
        break;
      // Agrega más casos según sea necesario para otros estados.
      default:
        break;
    }
  }

  return isLoading ? (
    <p>Loading...</p>
  ) : hasError ? (
    <p>Error detected</p>
  ) : (
    <div className="flex items-center justify-center w-full">
      <div
        className="bg-princblue w-full m-32 rounded-[10px] p-10 space-y-5 "
        id="formulario"
      >
        <div className="space-x-3">
          <label>Llave</label>
          <select
            id="llave"
            onChange={() => {
              handleChange(event, "key");
            }}
          >
            <option value="PLAY-IN">Play-In</option>
            <option value="CUARTOS DE CONF">Cuartos de Conferencia</option>
            <option value="SEMIS DE CONF">Semis de conferencia</option>
            <option value="FINAL DE CONF">Final de conferencia</option>
            <option value="FINALES NBA">Finales de NBA</option>
          </select>
        </div>

        {key !== "FINALES NBA" ? (
          <div className="space-x-3 items-center">
            <label>Conferencia</label>
            <select
              className="w-fit"
              id="conferencia"
              onChange={() => {
                handleChange(event, "conference");
              }}
            >
              <option value="East">Este</option>
              <option value="West">Oeste</option>
            </select>
          </div>
        ) : (
          <></>
        )}

        <div className="space-x-3">
          <label>Equipo 1</label>
          <SelectTeam
            key={key}
            conference={key !== "FINALES NBA" ? conference : "East"}
            handleChange={handleChange}
            teamChange="team1"
          />
        </div>

        <div className="space-x-3">
          <label>Equipo 2</label>
          <SelectTeam
            key={key}
            conference={key !== "FINALES NBA" ? conference : "West"}
            handleChange={handleChange}
            teamChange="team2"
          />
        </div>

        <SaveButton
          onClick={agregarPartido}
          state={guardadoExitoso}
          text={"Save Match"}
        />
        <button
          className="mt-4 bg-[#6e6e6e] rounded-[10px] w-1/2"
          onClick={() => {
            router.push("/menu/playoff");
          }}
        >
          Volver
        </button>
      </div>
    </div>
  );
};

export default newGame;
