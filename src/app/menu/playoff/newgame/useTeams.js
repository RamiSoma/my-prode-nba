import { useEffect, useState } from "react";
import { fetchTeams } from "@/api/nba";

export default function useTeams() {
  const [teams, setTeams] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      let [err, equipos] = await fetchTeams();

      if (err) {
        console.log(`${err}`);
        setHasError(true);
        setIsLoading(false);
        return;
      }

      setTeams(equipos);
      setHasError(false);
      setIsLoading(false);
    })();
  }, []);

  return [teams, isLoading, hasError];
}
