import React, { useEffect, useState } from "react";
import Game from "./Game";
import { useRouter } from "next/navigation";
import useGame from "../useGame";
import Loading from "../Loading";
import PlayoffSection from "./PlayoffSection";
import { UserAuth } from "@/context/AuthContext";

function PlayoffBracket({}) {
  const { user, googleSignIn, logOut, loadingUser } = UserAuth();
  const [games, hasError, isLoading] = useGame();
  const [key, setKey] = useState("PLAY-IN"); //'PLAY-IN','CUARTOS DE CONF', 'SEMIS DE CONF', 'FINAL DE CONF', 'FINALES NBA'
  const [conference, setConference] = useState("East"); //'East','West'

  const router = useRouter();

  function toggleForm() {
    router.push("/menu/playoff/newgame");
  }

  function handleClick(event, stateToUpdate) {
    // Usa el nombre del estado (stateToUpdate) para decidir qué estado actualizar.
    switch (stateToUpdate) {
      case "conference":
        setConference(event.target.value);
        break;
      case "key":
        setKey(event.target.value);
        break;
      // Agrega más casos según sea necesario para otros estados.
      default:
        break;
    }
  }

  return isLoading ? (
    <Loading Infinity />
  ) : hasError ? (
    <p>Error detected!</p>
  ) : (
    <div className="absolute h-full w-full mt-[50px] top-0 ">
      <div className="flex w-full space-x-5 overflow-x-auto left-0">
        <PlayoffSection
          playoffKey={"PLAY-IN"}
          onClick={handleClick}
          bold={key === "PLAY-IN"}
        />
        <PlayoffSection
          playoffKey={"CUARTOS DE CONF"}
          onClick={handleClick}
          bold={key === "CUARTOS DE CONF"}
        />
        <PlayoffSection
          playoffKey={"SEMIS DE CONF"}
          onClick={handleClick}
          bold={key === "SEMIS DE CONF"}
        />
        <PlayoffSection
          playoffKey={"FINAL DE CONF"}
          onClick={handleClick}
          bold={key === "FINAL DE CONF"}
        />
        <PlayoffSection
          playoffKey={"FINALES NBA"}
          onClick={handleClick}
          bold={key === "FINALES NBA"}
        />
      </div>

      {key !== "FINALES NBA" ? (
        <div className="mt-[10px] space-x-5">
          <PlayoffSection
            playoffKey={"East"}
            onClick={handleClick}
            bold={conference === "East"}
            stateToUpdate={"conference"}
          />
          <PlayoffSection
            playoffKey={"West"}
            onClick={handleClick}
            bold={conference === "West"}
            stateToUpdate={"conference"}
          />
        </div>
      ) : (
        <></>
      )}

      <div
        id="games"
        className="bg-[#3b3b3b] my-[10px] mx-[10px]  p-[10px] rounded-[30px] border border-[#555]"
      >
        <h3 className=" font-bold left-[10px] mb-7">GAMES</h3>

        {games.filter(
          (game) =>
            key === game.key &&
            (conference === game.team1.conference || key === "FINALES NBA")
        ).length === 0 ? (
          <p className="font-bold text-[#333]">No games loaded...</p>
        ) : (
          <div className="grid grid-col lg:grid-cols-2 gap-4">
            {games
              .filter(
                (game) =>
                  key === game.key &&
                  (conference === game.team1.conference ||
                    key === "FINALES NBA")
              )
              .map((game) => (
                <Game
                  key={game.team1.id + game.team2.id}
                  team1={game.team1}
                  team2={game.team2}
                  user={user}
                />
              ))}
          </div>
        )}
      </div>
      {user.isAdmin ? (
        <div>
          <button
            className="p-4 m-8 bg-[#026ed2] rounded-[10px] w-[100px] hover:bg-[#026ed28e]"
            onClick={toggleForm}
          >
            Add Game
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default PlayoffBracket;
