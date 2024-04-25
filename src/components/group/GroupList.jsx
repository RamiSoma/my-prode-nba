import { getGroupsByUsr, getGroupsNotByUser } from "@/api/database";
import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import Group from "./Group";

const GroupList = ({ user, isMember, searchSection }) => {
  const [groups, setGroups] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [search, setSearch] = useState("");

  async function getGroups() {
    let [err, groups] = [];
    if (isMember) {
      [err, groups] = await getGroupsByUsr(user);
    } else if (searchSection) {
      [err, groups] = await getGroupsNotByUser(user.email);
    }
    setGroups(groups);
    setLoading(false);
  }

  useEffect(() => {
    try {
      getGroups();
    } catch (err) {
      setError("There was an error getting the groups");
    }
  }, []);

  async function reloadGroups() {
    try {
      getGroups();
    } catch (error) {
      setError("There was an error getting the groups");
    }
  }

  return loading ? (
    <Loading Infinity />
  ) : error ? (
    <p className="text-red-500 text-center">{error}</p>
  ) : (
    <div className="w-full">
      <input
        className="bg-transparent w-full p-5"
        placeholder="Busca grupo aqui..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid w-full">
        {groups &&
          groups
            .filter((group) =>
              group.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((group) => (
              <Group
                key={group.id}
                group={group}
                user={user}
                isMember={isMember}
                searchSection={searchSection}
                reloadGroups={reloadGroups}
              />
            ))}
      </div>
    </div>
  );
};

export default GroupList;
