import React from "react";
import { Routes, Route } from 'react-router-dom'; // Import Routes instead of Router
import { AuthData } from "../Logic/AuthWrapper";
import { nav } from "./Navigation";
import Login from "../Pages/Login";
import Home from "../Pages/Home";

export const RenderRoutes = () => {
  const { user, token } = AuthData(); // Obtener el usuario y el token desde AuthData

  return (
    <Routes> {/* Use Routes instead of Router */}
      {user.isAuthenticated ? (
        <>
          {nav.map((page) => (
            <Route
              key={page.path}
              path={page.path}
              element={React.cloneElement(page.element, { token })} // Pasar el token como prop al elemento
            />
          ))}
          <Route element={<Home />} />
        </>
      ) : (
        <Route element={<Login />} path="*" />
      )}
    </Routes>
  );
};
