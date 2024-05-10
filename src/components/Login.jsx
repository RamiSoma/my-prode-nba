import { UserAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Button from "./buttons/Button";
import Logo from "./Logo";
import Loading from "./Loading";

const Login = () => {
  const { user, googleSignIn, logOut, loadingUser } = UserAuth();

  const router = useRouter();

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.error(error);
      return;
    }
  };

  return loadingUser ? (
    <Loading />
  ) : (
    <div className="flex flex-row  w-full h-screen ">
      <div className=" absolute right-0 w-1/2 h-screen">
        <div
          className="relative h-screen bg-cover bg-[50%_50%]"
          style={{
            backgroundImage: `url(/wallpapers/shai.jpg)`,
          }}
        >
          <img
            className="absolute w-[50%] bottom-[5%] left-[25%]"
            alt="Logonba"
            src="logonba.png"
          />
        </div>
      </div>
      <div className="absolute w-1/2 h-screen flex flex-col items-center justify-center">
        <Logo width={200} height={200} />
        <div className="[ font-family:'Anonymous_Pro-Bold', Helvetica] font-bold text-2xl ">
          MyProdeNBA
        </div>
        <div className="">
          Acierta resultados,
          <br />
          saborea el asado.
        </div>
        <div className="relative m-10 space-y-5">
          {!user ? (
            <Button text="Sign In with Google" onClick={handleSignIn} />
          ) : (
            <div className="grid grid-cols-1 space-y-5">
              <Button
                text="Start"
                onClick={() => {
                  router.push("/menu");
                }}
              />
              <button onClick={logOut}>
                <span className="border-b hover:font-bold hover:border-b-2">
                  Log Out
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
