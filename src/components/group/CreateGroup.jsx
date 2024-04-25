import React, { useEffect, useState } from "react";
import { UserAuth } from "@/context/AuthContext";
import { createNewGroup } from "@/api/database";
import SaveButton from "../buttons/SaveButton";
import { ACCESIBILITY_TYPES } from "@/types";
import SelectLogoModal from "./SelectLogoModal";
import GroupLogo from "./GroupLogo";
import toast, { Toaster } from "react-hot-toast";

const CreateGroup = ({ children, returnBack }) => {
  const { user, googleSignIn, logOut, loadingUser } = UserAuth();
  const [accesibility, setAccesibility] = useState(ACCESIBILITY_TYPES.PUBLIC);
  const [groupName, setGroupName] = useState();
  const [error, setError] = useState();
  const [saveSuccesfuly, setSaveSuccesfuly] = useState(false);
  const [selectLogoModal, setSelectLogoModal] = useState(false);
  const [photoURL, setPhotoURL] = useState();

  useEffect(() => {
    if (saveSuccesfuly) {
      const timeoutId = setTimeout(() => {
        setSaveSuccesfuly(false); // Vuelve a establecer el estado del éxito a false después de 1500 ms
        returnBack();
      }, 1500);
      // Limpiar el temporizador cuando el componente se desmonta o cuando el éxito cambia
      return () => clearTimeout(timeoutId);
    }
  }, [saveSuccesfuly]);

  useEffect(() => {
    if (error) {
      const timeoutId = setTimeout(() => {
        setError(); // Vuelve a establecer el estado del éxito a false después de 1500 ms
      }, 1500);
      // Limpiar el temporizador cuando el componente se desmonta o cuando el éxito cambia
      return () => clearTimeout(timeoutId);
    }
  }, [error]);

  useEffect(() => {
    if (photoURL) {
      setSelectLogoModal(false);
    }
  }, [photoURL]);

  async function saveGroup() {
    try {
      await createNewGroup(groupName, accesibility, user, photoURL);
      setSaveSuccesfuly(true); // Establece el estado de éxito como true
      toast.success("Group created successfully");
    } catch (error) {
      console.log(error);
      setError("There was an error saving the group");
    }
  }

  return (
    <div className="">
      <h2 className="text-2xl font-bold text-center mb-5">ADD NEW GROUP</h2>
      <div className="flex justify-center items-center py-2">
        <div className="grid grid-cols-1 justify-center items-center">
          <GroupLogo photoURL={photoURL} />
          <button
            onClick={() => setSelectLogoModal(true)}
            className="bg-white bg-opacity-30 button-gray hover:bg-opacity-20 h-[40px] rounded-lg  py-2"
          >
            Select Logo
          </button>
          {selectLogoModal && <SelectLogoModal setPhotoURL={setPhotoURL} />}
        </div>
      </div>
      <div>
        <label htmlFor="name" className="text-white block">
          Name
        </label>
        <input
          type="text"
          placeholder="Charly's Group"
          className={
            "w-1/2 bg-[#646363] mb-5  h-[40px] bg-transparent text-center  rounded-lg border-2 border-solid"
          }
          onChange={(e) => setGroupName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="type" className="text-white block mb-2 ">
          Accesibility
        </label>
      </div>
      <div>
        <select
          name="type"
          id="type"
          className="w-1/2 bg-[#646363] mb-5 h-[40px] bg-transparent text-center rounded-lg text-white border-2 border-solid"
          onChange={(e) => setAccesibility(e.target.value)}
        >
          <option className="" value={ACCESIBILITY_TYPES.PUBLIC}>
            Public
          </option>
          <option className="" value={ACCESIBILITY_TYPES.PRIVATE}>
            Private
          </option>
          {user?.isAdmin && (
            <option className="" value={ACCESIBILITY_TYPES.OFFICIAL}>
              Official
            </option>
          )}
        </select>
      </div>

      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div>
          {children}
          <SaveButton
            text={"Save"}
            className={`bg-princblue button-gray hover:bg-princbluehover `}
            onClick={() => saveGroup()}
          />
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default CreateGroup;
