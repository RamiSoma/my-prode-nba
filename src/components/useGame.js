import { leerPartidos } from "@/api/database";
import React, { useEffect, useState } from "react";

const useGame = () => {
  const [games, setGames] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      let [err, games] = await leerPartidos();

      if (err) {
        setHasError(true);
        setIsLoading(false);
        return;
      }

      setGames(games);
      setHasError(false);
      setIsLoading(false);
    })();
  }, []);

  return [games, hasError, isLoading];
};

export default useGame;
