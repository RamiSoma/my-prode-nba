import React, { useEffect, useState } from "react";
import {
  getStatus,
  getPredicts,
  guardarPrediccion,
  updateStatusGame,
  saveGameResult,
  getDataGame,
  deleteGame,
} from "@/api/database";

import Image from "next/image";
import StateButton from "../buttons/StateButton";
import SaveButton from "../buttons/SaveButton";
import Input from "../inputs/Input";
import Team from "./Team";
import { LineWave } from "react-loader-spinner";
import Loading from "../Loading";
import { UserAuth } from "@/context/AuthContext";

const Game = ({ team1, team2 }) => {
  const [predTeam1, setPredTeam1] = useState();
  const [predTeam2, setPredTeam2] = useState();
  const [resultTeam1, setResultTeam1] = useState();
  const [resultTeam2, setResultTeam2] = useState();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState();
  const [guardadoExitoso, setGuardadoExitoso] = useState(false);
  const { user, googleSignIn, logOut, loadingUser } = UserAuth();
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Obtener datos del juego
        const id_game = team1.id + "x" + team2.id;
        const predict = await getPredicts(id_game, user?.email);
        await setPredTeam1(predict.pred_team1);
        await setPredTeam2(predict.pred_team2);

        const dataGame = await getDataGame(team1.id, team2.id);
        setResultTeam1(dataGame.result_team1);
        setResultTeam2(dataGame.result_team2);

        const gameStatus = await getStatus(team1.id, team2.id);
        setStatus(gameStatus);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }

    fetchData();
  }, [team1.id, team2.id, user?.email]);

  const saveResult = (e) => {
    e.preventDefault();
    const id_game = team1.id + "x" + team2.id;
    try {
      saveGameResult(id_game, resultTeam1, resultTeam2);
      setGuardadoExitoso(true);

      setTimeout(() => {
        setGuardadoExitoso(false);
      }, 1800);
    } catch (error) {}
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificar si las predicciones están definidas antes de guardar
    if (predTeam1 !== undefined && predTeam2 !== undefined) {
      try {
        guardarPrediccion(
          team1.id,
          team2.id,
          predTeam1,
          predTeam2,
          user?.email
        );
        setGuardadoExitoso(true);

        setTimeout(() => {
          setGuardadoExitoso(false);
        }, 1800);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleChange = (e, stateToUpdate) => {
    const value = e.target.value;
    switch (stateToUpdate) {
      case "1":
        setPredTeam1(value);
        break;
      case "2":
        setPredTeam2(value);
        break;
      case "result_team1":
        setResultTeam1(value);
        break;
      case "result_team2":
        setResultTeam2(value);
        break;
      default:
        break;
    }
  };

  const handleClick = async (e, stateToUpdate) => {
    e.preventDefault();
    let newStatus;
    switch (stateToUpdate) {
      case "editable":
        newStatus = "editable";
        break;
      case "uneditable":
        newStatus = "uneditable";
        break;
      case "finished":
        newStatus = "finished";
        break;
      default:
        break;
    }
    setStatus(newStatus);
    await updateStatusGame(team1.id + "x" + team2.id, newStatus);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (isDeleting) {
      try {
        deleteGame(team1.id + "x" + team2.id);
      } catch (error) {
        console.log(error);
      }
    }
    setIsDeleting(!isDeleting);
  };

  return loading ? (
    <Loading linewave />
  ) : (
    <div className="flex items-center justify-center bg-princblue p-[15px] rounded-[20px]">
      <form className="w-full " onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-[20%]">
          <Team
            team={team1}
            predTeam={predTeam1}
            status={status}
            loading={loading}
            onChange={setPredTeam1}
          />
          <Team
            team={team2}
            predTeam={predTeam2}
            status={status}
            loading={loading}
            onChange={setPredTeam2}
          />
        </div>

        {status === "editable" ? (
          <SaveButton
            type="submit"
            text={"Save Predict"}
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
            {status === "finished" ? (
              <div>
                <div className="grid grid-cols-2 gap-[20%] justify-items-center mt-8">
                  <Input
                    state={"result_team1"}
                    resultTeam={resultTeam1}
                    onChange={handleChange}
                    status={loading}
                    unabled
                    user={user}
                  />
                  <Input
                    state={"result_team2"}
                    resultTeam={resultTeam2}
                    onChange={handleChange}
                    status={loading}
                    unabled
                    user={user}
                  />
                </div>
                {user && user.isAdmin ? (
                  <SaveButton
                    onClick={saveResult}
                    text={"Save Result"}
                    state={guardadoExitoso}
                  />
                ) : null}
              </div>
            ) : null}
          </div>
        )}
        {user && user.isAdmin ? (
          <div className="flex justify-center">
            <StateButton
              stateToUpdate={"uneditable"}
              src="/lock.png"
              handleClick={handleClick}
            />
            <StateButton
              stateToUpdate={"editable"}
              src="/unlock.png"
              handleClick={handleClick}
            />
            <StateButton
              stateToUpdate={"finished"}
              src="/score.png"
              handleClick={handleClick}
            />
            <StateButton
              className={`${isDeleting ? "bg-black" : ""}`}
              src="/delete.png"
              handleClick={handleDelete}
            />
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default Game;
