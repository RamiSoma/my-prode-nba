import React, { useEffect, useState } from "react";
import SectionButton from "../buttons/SectionButton";
import {
  deleteGroup,
  getUsersByGroup,
  joinGroup,
  leaveGroupDB,
} from "@/api/database";
import Positions from "../tables/Positions";
import GroupLogo from "./GroupLogo";
import toast, { Toaster } from "react-hot-toast";

const Group = ({ group, user, isMember, searchSection, reloadGroups }) => {
  const [view, setView] = useState();
  const [users, setUsers] = useState();
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [isAdminOfGroup, setIsAdminOfGroup] = useState();
  const [accesibility, setAccesibility] = useState();
  const [deleteGroupConfirm, setDeleteGroup] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [leaveGroup, setLeaveGroup] = useState(false);

  useEffect(() => {
    setView("general");
    setIsAdminOfGroup(group.admin.email === user.email);
    setAccesibility(group.accesibility);
  }, []);

  async function clickOnDeleteGroup() {
    setIsDeleting(true);
    try {
      await deleteGroup(group.id);
      reloadGroups();
    } catch (error) {
      console.log(error);
    }
  }

  async function clickOnLeaveGroup() {
    setLeaveGroup(true);
    try {
      await leaveGroupDB(group.id, user);
      reloadGroups();
    } catch (error) {
      console.log(error);
    }
  }

  function copiarAlPortapapeles(texto) {
    try {
      // Crea un elemento de texto temporal
      const elementoTemporal = document.createElement("textarea");
      elementoTemporal.value = texto;

      // Agrega el elemento al DOM (no será visible)
      document.body.appendChild(elementoTemporal);

      // Selecciona el contenido del elemento
      elementoTemporal.select();

      // Ejecuta el comando de copiado
      document.execCommand("copy");

      // Elimina el elemento temporal
      document.body.removeChild(elementoTemporal);

      toast("Link copiado al portapapeles!");
    } catch (error) {
      toast("Error al copiar link");
    }
  }

  async function getUsers() {
    setLoadingUsers(true);
    let [err, users] = await getUsersByGroup(group.id);
    setUsers(users);

    setLoadingUsers(false);
  }

  async function joinToGroup() {
    setIsJoining(true);
    try {
      await joinGroup(group.id, user);
      reloadGroups();
    } catch (error) {
      console.log(error);
    }
  }

  return isJoining ? (
    <p>Joining . . .</p>
  ) : isDeleting ? (
    <p className="text-red-500">Deleting . . .</p>
  ) : searchSection ? (
    <div className="p-3">
      <GroupLogo
        photoURL={group.photoURL}
        name={group.name}
        accesibility={accesibility}
      >
        <SectionButton
          text={"Join"}
          className={"w-1/5 mt-5"}
          onClick={() => {
            joinToGroup();
          }}
        />
      </GroupLogo>
    </div>
  ) : (
    <div className="w-full duration-1000 ease-in transition-all p-2">
      {view === "general" ? (
        <div
          className={`z-10 flex items-center justify-center flex-col rounded-md`}
          onClick={() => {
            isMember && getUsers();
            setView("details");
          }}
        >
          <div className="cursor-pointer hover:scale-105 transition-transform">
            <GroupLogo
              photoURL={group.photoURL}
              name={group.name}
              accesibility={accesibility}
            />
          </div>
        </div>
      ) : view === "details" && isMember ? (
        <div
          className={` z-10 flex items-center justify-center flex-col  rounded-lg border-b-2 transition-all duration-1000 ease-in pb-2`}
        >
          <div className="w-full ">
            <GroupLogo
              photoURL={group.photoURL}
              name={group.name}
              accesibility={accesibility}
            />

            {loadingUsers ? (
              <div className="w-full h-64  flex items-center justify-center">
                Loading...
              </div>
            ) : (
              <div className="overflow-auto h-96 py-5">
                <Positions
                  users={users}
                  global={false}
                  isAdminOfGroup={isAdminOfGroup}
                />
              </div>
            )}
            {!deleteGroupConfirm && !leaveGroup ? (
              <div>
                <SectionButton
                  text={"Return"}
                  className={"bg-[#323232] mx-2"}
                  onClick={() => {
                    setView("general");
                  }}
                />
                <SectionButton
                  text={"Copy Link"}
                  className={"bg-princblue mx-2 hover:bg-princbluehover"}
                  onClick={() => {
                    copiarAlPortapapeles(group.id);
                  }}
                />
                <Toaster />
                {isAdminOfGroup ? (
                  <SectionButton
                    text={"Delete"}
                    className={"bg-red-500 mx-2 hover:bg-red-700"}
                    onClick={() => {
                      setDeleteGroup(true);
                    }}
                  />
                ) : (
                  <SectionButton
                    text={"Leave"}
                    className={"bg-red-500 mx-2 hover:bg-red-700"}
                    onClick={() => {
                      setLeaveGroup(true);
                    }}
                  />
                )}
              </div>
            ) : (
              <div className="w-full flex items-center justify-center">
                <label className="text-white">Are you sure?</label>
                <SectionButton
                  text={"Yes"}
                  className={"bg-red-500 mx-2 hover:bg-red-700"}
                  onClick={() => {
                    deleteGroupConfirm
                      ? clickOnDeleteGroup()
                      : clickOnLeaveGroup();
                  }}
                />
                <SectionButton
                  text={"No"}
                  className={"bg-princblue mx-2 hover:bg-princbluehover"}
                  onClick={() => {
                    deleteGroupConfirm
                      ? setDeleteGroup(false)
                      : setLeaveGroup(false);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Group;
