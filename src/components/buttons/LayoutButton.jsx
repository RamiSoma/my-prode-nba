"use client";

import { useRouter } from "next/navigation";
import React from "react";

const LayoutButton = ({ route, text, className }) => {
  const router = useRouter();

  return (
    <button
      className={`border-b-2 border-transparent hover:border-white  ${className}`}
      onClick={() => {
        router.push(`/menu/${route}`);
      }}
    >
      {text}
    </button>
  );
};

export default LayoutButton;
