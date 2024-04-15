import { Route, Routes } from "react-router-dom";
//import { AuthData } from "AuthWrapper";
import { nav } from "./Navigation";
import Login from "../Pages/Login";
import Home from "../Pages/Home"; // Import Home component

export const RenderRoutes = () => {
    //const { user } = AuthData();
    
    return (
        <Routes>
            {
                false ? ( //user.isAuthenticated
                    <>
                        {nav.map((page) => (
                            <Route key={page.path} path={page.path} element={page.element} />
                        ))}
                        <Route element={<Home />} /> 
                    </>
                ) : (
                    <Route element={<Login />} />
                )
            }
        </Routes>
    );
};
