const { Anonymous_Pro } = require("next/font/google");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        princred: "#D24848",
        princredhover: "#872E2E",
        princblue: "#254441",
        princbluehover: "#305955",
      },
    },
  },
  fontFamily: { anonymous: ["Anonymous_Pro"] },
  plugins: [],
};
