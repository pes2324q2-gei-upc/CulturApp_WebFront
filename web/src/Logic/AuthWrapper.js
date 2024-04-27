// AuthWrapper.js

import { createContext, useContext, useState } from "react";
import { RenderRoutes } from "./RenderRoutes";
import Header from "../Components/Header"

const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);

export const AuthWrapper = () => {
  const [user, setUser] = useState({ name: "", isAuthenticated: false });
  const [token, setToken] = useState(null)

  const login = async (username, password) => {
    try {
      const response = await fetch('http://localhost:8080/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = (await response.text()).trim();
      const token = response.headers.get('Authorization');


      if (data === 'OK') {
        setUser({ name: username, isAuthenticated: true });
        setToken(token); // Set the token upon successful login
        return "success"; // Return success if login is successful
      } else {
        throw new Error(data); // Throw an error if login fails
      }
    } catch (error) {
      console.error('Error:', error);
      throw new Error("Failed to login"); // Throw an error if there's a network error or other issues
    }
  };

  const logout = () => {
    setUser({ ...user, isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, token }}>
      <>
        {user.isAuthenticated && <Header />} {/* Render Header if authenticated */}
        <RenderRoutes />
      </>
    </AuthContext.Provider>
  );
};
