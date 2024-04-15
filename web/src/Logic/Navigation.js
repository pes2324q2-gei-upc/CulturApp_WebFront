import Home from "../Pages/Home"
import Login from "../Pages/Login"
import ReportBug from "../Pages/ReportBug"
import ReportUser from "../Pages/ReportUser"
import RequestOrg from "../Pages/RequestOrg"


export const nav = [
     { path:     "/",            name: "Home",          element: <Home />,        },
     { path:     "/reportbug",   name: "ReportBug",     element: <ReportBug />,   },
     { path:     "/reportuser",  name: "ReportUser",    element: <ReportUser />,  },
     { path:     "/requestorg",  name: "RequestOrg",    element: <RequestOrg />,  },
     { path:     "/login",       name: "Login",         element: <Login />,       },
]