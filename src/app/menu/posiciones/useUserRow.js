import { getUsers } from "@/api/database";
import React, { useEffect, useState } from "react";

const useUserRow = () => {
  const [users, setUsers] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      let [err, users] = await getUsers();

      if (err) {
        setHasError(true);
        setIsLoading(false);
        return;
      }

      setUsers(users);
      setHasError(false);
      setIsLoading(false);
    })();
  }, []);

  return [users, hasError, isLoading];
};

export default useUserRow;
