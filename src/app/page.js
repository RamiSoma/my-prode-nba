"use client";

import styles from "./page.module.css";
import Login from "@/components/Login";
import { AuthContextProvider } from "@/context/AuthContext";

export default function Home() {
  return (
    <AuthContextProvider>
      <main className={styles.main}>
        <Login />
      </main>
    </AuthContextProvider>
  );
}
