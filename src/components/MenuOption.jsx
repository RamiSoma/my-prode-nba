"use client";

import { useRouter } from "next/navigation";
import React from "react";

const MenuOption = ({ wallpaper, route, className, text }) => {
  const router = useRouter();

  return (
    <div className={`overflow-hidden absolute ${className}`}>
      <div
        className="flex flex-col items-center justify-center bg-cover bg-center w-full h-full transition-transform transform-gpu scale-100 hover:scale-110 duration-500"
        style={{
          backgroundImage: `url(/wallpapers/${wallpaper}.jpg)`,
        }}
      >
        <button
          className="font-bold w-full h-full"
          onClick={() => {
            router.push(`/menu/${route}`);
          }}
        >
          {text}
        </button>
      </div>
    </div>
  );
};

export default MenuOption;
