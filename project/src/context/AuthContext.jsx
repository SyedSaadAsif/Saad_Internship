import { createContext, useContext, useState, useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  
} from "firebase/firestore";

import { db } from "../services/firebase";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [normallogin, setNormalLogin] = useState(false);
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const login = async (username, password) => {
    if (username === "admin" && password === "admin123") {
      setIsLoggedIn(true);
      return true;
    }
     try {

    const q = query(
      collection(db, "logininfo"),
      where("username", "==", username)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {

      return false;

    }

    const user = snapshot.docs[0].data();

    if (user.password === password) {

      setNormalLogin(true);
      setIsLoggedIn(true);
      return true;
    }

  } catch (error) {

    console.error("Login Error:", error);

  }

    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setNormalLogin(false);
   
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        normallogin,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);