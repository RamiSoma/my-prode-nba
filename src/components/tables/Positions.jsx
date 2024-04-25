import React from "react";
import UserRow from "./UserRow";

const Positions = ({ users, global = true, isAdminOfGroup }) => {
  return (
    <table className="w-full table-auto">
      <thead>
        <tr>
          <th className="p-2">POSICION</th>
          {global ? null : <th className="p-2"></th>}
          <th className="p-2">NOMBRE</th>
          <th className="p-2">PUNTOS</th>
          <th className="p-2"></th>
        </tr>
      </thead>
      <tbody>
        {users
          .sort((a, b) => b.points - a.points)
          .map((user, index) => (
            <UserRow
              global={global}
              position={index}
              key={index}
              username={user.displayName}
              photoURL={user.photoURL}
              points={user.points ? user.points : 0}
              isAdminOfGroup={isAdminOfGroup}
            />
          ))}
      </tbody>
    </table>
  );
};

export default Positions;
