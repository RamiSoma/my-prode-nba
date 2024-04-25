import Image from "next/image";
import React, { useLayoutEffect, useState } from "react";

const GroupLogo = ({ children, photoURL, name }) => {
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 640); // Define el ancho límite para dispositivos móviles
      };
      handleResize(); // Verifica el tamaño inicial al cargar la página

      window.addEventListener("resize", handleResize); // Agrega el evento de cambio de tamaño de la ventana

      return () => {
        window.removeEventListener("resize", handleResize); // Limpia el evento al desmontar el componente
      };
    } else {
      console.warn(
        "La ventana no está disponible, Firebase Performance no puede ser utilizado en este entorno."
      );
    }
  }, []);

  return photoURL ? (
    <div className="bg-princblue rounded-full flex flex-col items-center justify-center p-6">
      <div className=" flex justify-center items-center lg:gap-32 gap-12 duration-1000 ease-in-out transition-all w-full">
        <img
          src={photoURL}
          alt="logo"
          width={isMobile ? 64 : 132}
          height={isMobile ? 64 : 132}
          className=""
        />

        {name ? (
          <h1 className="font-bold text-2xl text-white rounded-lg">{name}</h1>
        ) : null}
      </div>
      {children}
    </div>
  ) : null;
};

export default GroupLogo;
