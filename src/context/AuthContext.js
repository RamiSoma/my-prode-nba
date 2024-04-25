import { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../api/firebase";
import { saveUser } from "@/api/database";

// Create a new context for authentication
const AuthContext = createContext();

// Custom hook for handling authentication
export const UserAuth = () => {
  return useContext(AuthContext);
};

// Authentication context provider component
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true); // Initialize loading state as true

  // Function for signing in with Google
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  // Function for logging out
  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    // Subscribe to authentication state changes
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoadingUser(false); // Set loading state to false once authentication state is loaded

      if (currentUser) {
        const userData = {
          displayName: currentUser.displayName,
          email: currentUser.email,
          photoURL: currentUser.photoURL,
          isAdmin: currentUser.email === "somavillarami@gmail.com", // Simplified isAdmin check
        };

        // Save user data locally and in the database
        if (typeof window !== "undefined") {
          await window.localStorage.setItem("user", JSON.stringify(userData));
        }
        await setUser(userData);
        await saveUser(userData);
        await setUser(userData);
      }
    });

    // Unsubscribe from authentication state changes when component unmounts
    return () => unsubscribe();
  }, []);

  // Expose user, googleSignIn, and logOut values and functions via context provider
  return (
    <AuthContext.Provider value={{ user, googleSignIn, logOut, loadingUser }}>
      {children}
    </AuthContext.Provider>
  );
};
