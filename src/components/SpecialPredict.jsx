"use client";

import React, { useEffect, useState } from "react";
import SelectTeam from "./inputs/SelectTeam";
import SaveButton from "./buttons/SaveButton";
import Input from "./inputs/Input";
import PlayerListModal from "./PlayerListModal";
import {
  getGamesByKey,
  getSpecialPredict,
  getStatus,
  saveSpecialPredict,
  saveSpecialPredictResult,
} from "@/api/database";
import { UserAuth } from "@/context/AuthContext";
import Image from "next/image";
import Loading from "./Loading";

const SpecialPredict = () => {
  const { user } = UserAuth();
  const [team1, setTeam1] = useState();
  const [team2, setTeam2] = useState();
  const [predTeam1, setPredTeam1] = useState();
  const [predTeam2, setPredTeam2] = useState();
  const [showModal, setShowModal] = useState(false);
  const [mvp, setMVP] = useState();
  const [status, setStatus] = useState("editable");
  const [guardadoExitoso, setGuardadoExitoso] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const [err, games] = await getGamesByKey("PLAY-IN");
        if (games) {
          games.forEach((game) => {
            if (game.status !== "editable") {
              setStatus(game.status);
            }
          });
        }
        const [errSpecialPredict, specialPredict] = await getSpecialPredict(
          user?.email
        );
        if (specialPredict) {
          setTeam1(specialPredict.team1);
          setTeam2(specialPredict.team2);
          setPredTeam1(specialPredict.predTeam1);
          setPredTeam2(specialPredict.predTeam2);
          setMVP(specialPredict.mvp);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError("Error al cargar datos");
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [user]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleClick = () => {
    if (predTeam1 == 4 || predTeam2 == 4) {
      toggleModal();
    } else {
      setError("Un equipo debe ganar 4 partidos...");
    }
  };

  const handleChange = (e, stateToUpdate) => {
    const value = e.target.value;
    switch (stateToUpdate) {
      case "team1":
        setTeam1(value);
        break;
      case "team2":
        setTeam2(value);
        break;
      case "predTeam1":
        setPredTeam1(value);
        break;
      case "predTeam2":
        setPredTeam2(value);
        break;
      default:
        break;
    }
  };

  const handleMVPClick = (playerId) => {
    playerId && setMVP(playerId);
    toggleModal();
  };

  const handleSaveButtonClick = async () => {
    try {
      await saveSpecialPredict(
        team1,
        team2,
        predTeam1,
        predTeam2,
        mvp,
        user.email
      );
      setGuardadoExitoso(true);
    } catch (error) {
      setError("Debe llenar todos los campos");
      console.error("Error saving special predict:", error);
    }
  };

  const handleChargeButtonClick = async () => {
    try {
      await saveSpecialPredictResult(team1, team2, predTeam1, predTeam2, mvp);
      setGuardadoExitoso(true);
      setTimeout(() => {
        setGuardadoExitoso(false);
      }, 1800);
    } catch (error) {
      console.error("Error charging special predict:", error);
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="flex-col justify-center items-center m-10 p-5 bg-princblue rounded-[20px] ">
      <h3 className="text-2xl font-bold">NBA Finals Predict</h3>
      <div>
        <SelectTeam
          conference={"East"}
          handleChange={handleChange}
          teamChange="team1"
          disabled={status !== "editable" && !user?.isAdmin}
          teamDefault={team1}
        />
        <Input
          text={"Team 1"}
          onChange={handleChange}
          state={"predTeam1"}
          resultTeam={predTeam1}
          disabled={status !== "editable" && !user?.isAdmin}
          className={`${error ? "border-princred border-solid border-2" : ""}`}
        />
      </div>
      <div>
        <SelectTeam
          conference={"West"}
          handleChange={handleChange}
          teamChange="team2"
          disabled={status !== "editable" && !user?.isAdmin}
          teamDefault={team2}
        />
        <Input
          text={"Team 2"}
          onChange={handleChange}
          state={"predTeam2"}
          resultTeam={predTeam2}
          disabled={status !== "editable" && !user?.isAdmin}
          className={`${error ? "border-princred border-solid border-2" : ""}`}
        />
      </div>
      <button
        className={`bg-[#3e746e] mt-4 p-3 rounded-[10px]  ease-in duration-200 ${
          error
            ? "border-princred border-solid border-2"
            : "border border-slate-300 hover:border-slate-400"
        }`}
        onClick={handleClick}
        disabled={status !== "editable" && !user?.isAdmin}
      >
        MVP
      </button>

      {showModal && (
        <PlayerListModal
          team={predTeam1 == 4 ? team1 : team2}
          onClick={handleMVPClick}
        />
      )}
      <div className="h-7">
        {(error && <p className="text-red-500 font-bold font-xl">{error}</p>) ||
          (mvp && <p className="text-white">{mvp}</p>)}
      </div>
      {status === "editable" ? (
        <SaveButton
          text={"Save Special Predict"}
          onClick={handleSaveButtonClick}
          state={guardadoExitoso}
        />
      ) : user?.isAdmin ? (
        <SaveButton
          text={"Charge Special Predict"}
          onClick={handleChargeButtonClick}
          state={guardadoExitoso}
        />
      ) : (
        <div className="flex justify-center flex-col items-center">
          <Image
            width={24}
            height={24}
            className={`p-1 rounded-full mt-5 bg-[#162927] ${
              user && user.isAdmin ? "hidden" : ""
            }`}
            src="/lock.png"
          />
        </div>
      )}
    </div>
  );
};

export default SpecialPredict;
