"use client";

import { Inter, Roboto } from "next/font/google";
import "../globals.css";
import { useRouter } from "next/navigation";
import LayoutButton from "@/components/buttons/LayoutButton";
import Logo from "@/components/Logo";
import { AuthContextProvider } from "@/context/AuthContext";

export default function RootLayout({ children }) {
  const router = useRouter();
  return (
    <html lang="en">
      {/*ACA VA LO QUE IRIA EN EL HEADER EN UN HTML NORMAL*/}
      <link rel="icon" href="/strategy.png" />
      <body>
        <AuthContextProvider>
          <nav className="relative h-[40px] z-50  bg-[#101010] p-7 ">
            <div className="flex items-center absolute top-3 left-[5px] w-[30px] h-[30px] ml-[15px] hover:scale-105 transition-all duration-150 ease-in-out">
              <button
                onClick={() => {
                  router.push("/");
                }}
                className="flex flex-row items-center"
              >
                <Logo className="mr-[10px] " width={40} height={40} />

                <p
                  className={`text-xl hidden lg:block [font-family:'Anonymous_Pro-Bold', Helvetica] font-bold text-princred`}
                >
                  MyProdeNBA
                </p>
              </button>
            </div>
            <div className="absolute space-x-4 top-3 right-[25px] h-full">
              <LayoutButton text={"Predicts"} route={"playoff"} />
              <LayoutButton text={"Specials"} route={"specialPredicts"} />
              <LayoutButton text={"Tables"} route={"posiciones"} />
            </div>
          </nav>
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
