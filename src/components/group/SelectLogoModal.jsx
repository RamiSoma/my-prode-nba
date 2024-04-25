import Image from "next/image";
import React from "react";

const SelectLogoModal = ({ setPhotoURL }) => {
  const logos = [
    "/logo_groups/basketball-player(1).png",
    "/logo_groups/basketball-player-scoring.png",
    "/logo_groups/basketball-player.png",
    "/logo_groups/chameleon.png",
    "/logo_groups/elephant.png",
    "/logo_groups/lion.png",
    "/logo_groups/panda.png",
    "/logo_groups/raccoon.png",
    "/logo_groups/wolf.png",
  ];

  return (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur bg-princblue justify-center items-center flex ">
      <div className="bg-white bg-opacity-10 grid grid-cols-3 gap-24 p-8 rounded-lg">
        {logos.map((logo, index) => (
          <button
            onClick={() => {
              setPhotoURL(logo);
            }}
            className="hover:font-bold hover:scale-110 transform-gpu ease-in duration-50"
          >
            <img src={logo} alt="logo" width={82} height={82} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectLogoModal;
