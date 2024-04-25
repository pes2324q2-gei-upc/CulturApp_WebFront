import { Route, Routes } from "react-router-dom";
import { AuthData } from "../Logic/AuthWrapper"; // Import AuthWrapper
import { nav } from "./Navigation";
import Login from "../Pages/Login";
import Home from "../Pages/Home"; // Import Home component

export const RenderRoutes = () => {
    const { user } = AuthData(); // Use AuthWrapper to get the user
    
    return (
        <Routes>
            {
                user.isAuthenticated ? ( // Check if user is authenticated
                    <>
                        {nav.map((page) => (
                            <Route key={page.path} path={page.path} element={page.element} />
                        ))}
                        <Route element={<Home />} /> 
                    </>
                ) : (
                    <Route element={<Login />} path="*" />
                )
            }
        </Routes>
    );
};
