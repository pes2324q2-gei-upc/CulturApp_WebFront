// Navigation.js
import React from "react";
import DetailBug from "../Pages/DetailBug";
import DetailOrg from "../Pages/DetailOrg";
import DetailUser from "../Pages/DetailUser";
import Home from "../Pages/Home";
import { Login } from "../Pages/Login";
import ReportBug from "../Pages/ReportBug";
import ReportUser from "../Pages/ReportUser";
import RequestOrg from "../Pages/RequestOrg";
import BannedUsers from "../Pages/BannedUsers";

export const nav = [
  { path: "/", name: "Home", element: <Home /> },
  { path: "/report-bug", name: "Bug Reports", element: <ReportBug /> },
  { path: "/report-bug/:id", name: "DetailBug", element: <DetailBug /> },
  { path: "/report-user", name: "User Report", element: <ReportUser /> },
  { path: "/report-user/:id", name: "DetailUser", element: <DetailUser /> },
  { path: "/request-org", name: "RequestOrg", element: <RequestOrg /> },
  { path: "/request-org/:id", name: "DetailOrg", element: <DetailOrg /> },
  { path: "/login", name: "Login", element: <Login /> },
  { path: "/banned-users", name: "Banned Users", element: <BannedUsers /> }
];

