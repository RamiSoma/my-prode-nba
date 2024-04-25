import { Roboto } from "next/font/google";

import "./globals.css";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "MyProdeNBA",
  description: "Acierta resultados, saborea el asado.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*ACA VA LO QUE IRIA EN EL HEADER EN UN HTML NORMAL*/}
      <link rel="icon" href="/strategy.png" />
      <body className={`${roboto.className} antialiased`}>{children}</body>
    </html>
  );
}
