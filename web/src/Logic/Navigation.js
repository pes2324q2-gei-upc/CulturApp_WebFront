import Home from "../Pages/Home"
import { Login } from "../Pages/Login"
import ReportBug from "../Pages/ReportBug"
import ReportUser from "../Pages/ReportUser"
import RequestOrg from "../Pages/RequestOrg"


export const nav = [
     { path:     "/",            name: "Home",          element: <Home />,        },
     { path:     "/report-bug",   name: "ReportBug",     element: <ReportBug />,   },
     { path:     "/report-user",  name: "ReportUser",    element: <ReportUser />,  },
     { path:     "/request-org",  name: "RequestOrg",    element: <RequestOrg />,  },
     { path:     "/login",       name: "Login",         element: <Login />,       },
]