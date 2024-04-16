// AuthWrapper.js

import { createContext, useContext, useState } from "react";
import { RenderRoutes } from "./RenderRoutes";
import Header from "../Components/Header"

const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);

export const AuthWrapper = () => {
  const [user, setUser] = useState({ name: "", isAuthenticated: false });

  const login = (userName, password) => {
    return new Promise((resolve, reject) => {
      if (password === "password") {
        setUser({ name: userName, isAuthenticated: true });
        resolve("success");
      } else {
        reject("Incorrect password");
      }
    });
  };

  const logout = () => {
    setUser({ ...user, isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <>
        {user.isAuthenticated && <Header />} {/* Render Header if authenticated */}
        <RenderRoutes />
      </>
    </AuthContext.Provider>
  );
};
