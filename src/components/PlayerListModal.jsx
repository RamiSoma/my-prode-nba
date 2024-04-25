import { fetchPlayers } from "@/api/nba";
import React, { useEffect, useState } from "react";

const PlayerListModal = ({ team, onClick }) => {
  const [loading, setLoading] = useState(true);
  const [players, setPlayers] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    try {
      fetchPlayers(team).then(async ([err, players]) => {
        await setPlayers(players);
        setLoading(false);
      });
    } catch {
      setError("No se pudieron cargar los jugadores");
    }
  }, []);

  useEffect(() => {
    // Si hay un error, establecer un temporizador para volver a establecer el estado del error a null después de 2 segundos
    if (error) {
      const timeoutId = setTimeout(() => {
        setError(null); // Vuelve a establecer el estado del error a null después de 2 segundos
      }, 1500);

      // Limpiar el temporizador cuando el componente se desmonta o cuando el error cambia
      return () => clearTimeout(timeoutId);
    }
  }, [error]);

  function handleClick() {
    onClick(event.target.value);
  }
  return (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur bg-princblue justify-center items-center flex">
      {loading ? (
        <p>Loading . . .</p>
      ) : (
        <div
          className="fixed inset-0 bg-opacity-30 backdrop-blur bg-princblue justify-center items-center flex"
          onClick={handleClick}
        >
          <div className="h-1/2 overflow-y-scroll w-[70%] bg-black rounded-lg bg-opacity-70">
            <ul>
              {players?.map((player, index) => (
                <li key={index} className="p-2">
                  <button
                    value={player.first_name + " " + player.last_name}
                    onClick={handleClick}
                    className="hover:font-bold hover:scale-110 transform-gpu ease-in duration-50"
                  >{`${player.first_name} ${player.last_name}`}</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerListModal;
