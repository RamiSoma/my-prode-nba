import React from "react";

const Navbar = () => {
  return (
    <nav className="relative h-[40px] z-50 h-[40px] bg-[#242424] border-b-[3px] [border-bottom-style: solid] border-princred">
      <div className="absolute top-[5px] left-[5px] w-[30px] h-[30px] ml-[15px]">
        <button
          onClick={() => {
            router.push("/");
          }}
          className="flex flex-row items-center"
        >
          <img
            className="w-[30px] h-[30px] mr-[10px]"
            alt="Strategy"
            src="/strategy.png"
          />

          <p className="hidden lg:block [font-family:'Anonymous_Pro-Bold', Helvetica] text-princred">
            MyProdeNBA
          </p>
        </button>
      </div>
      <div className="absolute flex space-x-4 right-[15px] top-[5px]">
        <button
          className="hover:border-solid hover:border-b-2"
          onClick={() => {
            router.push("/menu/specialPredicts");
          }}
        >
          Specials
        </button>
        <button
          className="hover:border-solid hover:border-b-2"
          onClick={() => {
            router.push("/menu/posiciones");
          }}
        >
          Positions
        </button>
        <button
          className="hover:border-solid hover:border-b-2"
          onClick={() => {
            router.push("/menu/playoff");
          }}
        >
          Predicts
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
