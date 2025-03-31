import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { AuthPath } from "../utils/paths";

// export function LoginPrivateRoute() {
//   const {token} = useAuth();
//   const location = useLocation();

//   if (token) {
//     const previousPath = location.pathname === "" ? "/" : location.pathname;
    
//     return <Navigate to="/" state={{page: previousPath}} replace/>
//   }

//   return <Outlet/>;
// }

export function LoggedPrivateRoute() {
  const {token} = useAuth();
  const location = useLocation();
  
  if(!token) {
    const previousPath = location.pathname === "" ? "/" : location.pathname;

    return <Navigate to={AuthPath} state={{page: previousPath}} replace/>
  }

  return <Outlet/>
}

export function AdminPrivateRoute() {
  const {token, decodedToken} = useAuth();
  const location = useLocation();
  
  if(!token) {
    const previousPath = location.pathname === "/login_register" ? "/" : location.pathname;

    return <Navigate to="/login_register" state={{page: previousPath}} replace/>
  }
  
  if(decodedToken.role !== "admin") return(<Navigate to="/" replace/>)

  return <Outlet/>
}