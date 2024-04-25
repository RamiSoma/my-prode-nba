"use client";

import React, { useContext, useEffect, useState } from "react";
import useUserRow from "./useUserRow";
import Loading from "@/components/Loading";
import SectionButton from "@/components/buttons/SectionButton";
import Positions from "@/components/tables/Positions";
import AddGroup from "@/components/group/CreateGroup";
import GroupList from "@/components/group/GroupList";
import { UserAuth } from "@/context/AuthContext";
import { GROUPLIST_SECTIONS } from "@/types";
import LogoLink from "@/components/group/LogoLink";

const page = () => {
  const { user, googleSignIn, logOut, loadingUser } = UserAuth();
  const [users, hasError, isLoading] = useUserRow();

  const [display, setDisplay] = useState();

  useEffect(() => {
    setDisplay(GROUPLIST_SECTIONS.GROUPS);
  }, []);

  return isLoading ? (
    <Loading Infinity />
  ) : hasError ? (
    <p>Error detected!</p>
  ) : (
    <div className="mx-2 mt-8">
      <div className="">
        <div className="grid grid-cols-2 gap-5 py-5 px-2 rounded-lg">
          {/*<SectionButton
            text={"Official Tournaments"}
            bold={display == GROUPLIST_SECTIONS.OFFICIAL}
            onClick={() => setDisplay(GROUPLIST_SECTIONS.OFFICIAL)}
            />*/}
          <SectionButton
            text={"Groups"}
            bold={
              display == GROUPLIST_SECTIONS.GROUPS ||
              display == GROUPLIST_SECTIONS.SEARCH ||
              display == GROUPLIST_SECTIONS.CREATE
            }
            onClick={() => setDisplay(GROUPLIST_SECTIONS.GROUPS)}
          />
          <SectionButton
            text={"Global"}
            bold={display == GROUPLIST_SECTIONS.GLOBAL}
            onClick={() => setDisplay(GROUPLIST_SECTIONS.GLOBAL)}
          />
        </div>
        <div className="mt-5">
          {display == GROUPLIST_SECTIONS.OFFICIAL ? (
            <div>Torneo Oficial </div>
          ) : display == GROUPLIST_SECTIONS.GROUPS ? (
            <div>
              <GroupList user={user} isMember />
              <SectionButton
                text={"Create Group"}
                className={" bg-[#303030] m-2"}
                onClick={() => {
                  setDisplay(GROUPLIST_SECTIONS.CREATE);
                }}
              />
              <SectionButton
                text={"Search Group"}
                className={" bg-[#303030] m-2"}
                onClick={() => {
                  setDisplay(GROUPLIST_SECTIONS.SEARCH);
                }}
              />
            </div>
          ) : display == GROUPLIST_SECTIONS.SEARCH ? (
            <div>
              <h2>Search Group</h2>
              <LogoLink />
              <GroupList user={user} searchSection />
              <SectionButton
                text={"Return"}
                className={" bg-[#303030] mx-2"}
                onClick={() => {
                  setDisplay(GROUPLIST_SECTIONS.GROUPS);
                }}
              />
            </div>
          ) : display == GROUPLIST_SECTIONS.CREATE ? (
            <div>
              <AddGroup
                returnBack={() => {
                  setDisplay(GROUPLIST_SECTIONS.GROUPS);
                }}
              >
                <SectionButton
                  text={"Return"}
                  className={" bg-[#303030] mx-2"}
                  onClick={() => {
                    setDisplay(GROUPLIST_SECTIONS.GROUPS);
                  }}
                />
              </AddGroup>
            </div>
          ) : (
            <Positions users={users} />
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
