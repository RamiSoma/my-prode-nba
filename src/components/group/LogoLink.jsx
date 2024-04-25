import React, { useState } from "react";
import SectionButton from "../buttons/SectionButton";
import { joinGroup } from "@/api/database";
import { UserAuth } from "@/context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const LogoLink = () => {
  const { user, googleSignIn, logOut, loadingUser } = UserAuth();
  const [link, setLink] = useState();

  async function joinToGroup() {
    try {
      await joinGroup(link, user);
      toast.success("Te has unido al grupo");
    } catch (error) {
      toast.error("Error al unirse al grupo");
    }
  }
  return (
    <div className="p-5 flex items-center justify-center ">
      <div className="flex flex-col bg-[#313131]  p-10 rounded-lg">
        <label>Ingresa tu codigo de invitacion</label>
        <input
          className="bg-transparent border-b-2 hover:bg-[#1d1d1d] p-1 my-5"
          onChange={(e) => setLink(e.target.value)}
        />
        <SectionButton
          text={"Join"}
          className={"bg-princblue hover:bg-princbluehover mt-5"}
          onClick={() => {
            joinToGroup();
          }}
        />
      </div>

      <Toaster />
    </div>
  );
};

export default LogoLink;
